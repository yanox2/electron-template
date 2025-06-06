# electron-template

このパッケージは、Electron アプリケーションを TypeScript で開発する際の **テンプレートとなる共通プログラム群**です。  
コードはすべて **ES Modules（ESM）形式**で記述されており、利用者が開発するアプリケーションも ESM 形式で構築されることを前提としています。

## Introduction

このテンプレートは、Electron アプリケーションの初期導入を容易にします。  
ウィンドウやメニューの生成を、関数呼び出しやメソッドのオーバーライドによって簡単に行うことができます。

デフォルトで以下の機能を備えています：

- アプリ終了時のウィンドウサイズ・座標を保存し、次回起動時に復元する設定ファイル
- レンダラープロセスとメインプロセス間の通信を行うプリロードスクリプト
- カスタム例外クラス
- ファイル操作ユーティリティクラス
- メッセージダイアログ

## Installation

```bash
npm install
```

## Usage

TypeScript のコードをトランスパイルするには以下を実行します：

```bash
npm run tsc
```

何も編集せずにアプリケーションを起動すると、デフォルトのウィンドウが表示されます：

```bash
npm run start
```

<img src="./images/001.png" alt="app window" width="400">

初期状態では、メニューも自動的に表示されます（※機能は未実装です）。

![menu](./images/002.png)

### 自身のアプリケーションの実装方法

### `MyApp.mts` の初期化メソッド

まず、`MyApp.mts` の初期化メソッドを実装します：

```typescript
// File: src/MyApp.mts
protected async myInit(){
	Exception.setLevel(1);
	const win: BaseWindow = new MyWindow();
	await win.init("main.html", "ipc/preload.cjs", this);
	//await win.init("main.html", undefined, this);
	//await win.init("main.html");
}
```

`BaseWindow` クラスの `init()` メソッドは、Electron アプリケーションの初期化およびウィンドウの生成を行います：

```typescript
public async init(loadFile: string, preloadFile?: string, lis?: CloseListener): void
```

#### `loadFile`
表示する HTML ファイルを指定します。  
デフォルトでは `dist/main.html` が読み込まれます。

#### `preloadFile`
プリロードスクリプトを指定します。  
デフォルトのプリロードスクリプトでは、メインプロセスとレンダラープロセスの通信ブリッジを定義しています。  
プリロードが不要な場合は、引数を省略するか `undefined` を指定します。

```typescript
// File: src/ipc/preload.cts
contextBridge.exposeInMainWorld("MyBridge", {
	testSend: (no: number) => ipcRenderer.invoke("testSend", no),
});
```
> **注意**
>  プリロードスクリプトは [CommonJS 形式で記述する必要があります](https://blog.softwarenote.info/p4891/)。

#### `lis`
ウィンドウを閉じたときに実行されるリスナーを指定します。  
デフォルトのリスナーでは、ウィンドウサイズや座標を設定ファイルに保存します。  
このリスナーは基底クラスに実装されており、`this` を渡すだけで機能します。  
不要な場合は省略可能です。

### `main.mts` のエントリーポイント

`MyApp` クラスは `main.mts` から呼び出されています。  
クラス名を変更したい場合は `main.mts` を編集してください。

```typesciprt
// File: src/main.mts
import MyApp from "./MyApp.mjs";

const main = async () => {
	const appBase: AppBase = new MyApp();
	await appBase.init();
};
```

### `MyWindow.mts` の初期化メソッド

次に `MyWindow.mts` の初期化メソッドを実装します。

```typescript
// File: src/MyWindow.mts
protected async myInit(){
	this.win?.webContents.openDevTools();
}
```

デフォルトでは、Developer Tools（開発者ツール）を起動するだけの実装です。  
ここから自身のアプリケーションのロジックを拡張してください。

## Notes

### メインプロセスとの通信

ウィンドウ上のボタンをクリックすると、メインプロセスへの通信イベントが発生します。  
デフォルトのイベントハンドラは `cmn/BaseWindow.mts` に実装されています。  
必要に応じて、このメソッドをオーバーライドしてください。

```typescript
// File: src/cmn/BaseWindow.mts
protected UIhandler(){
	ipcMain.handle("testSend", async (e, no: number) => {
		Exception.log(no);
		return "test" + no;
	});
}
 ```

クリックイベントの検知は、レンダラープロセス側の `ipc/renderer.mts` で実装されています。

```typescript
// File: src/ipc/renderer.mts
window.addEventListener("load", function(){
	let btnEle = document.getElementById("testSend");
	if(btnEle){
		btnEle.addEventListener("click", function(){
			window.MyBridge.testSend(10).then((msg) => {
				console.log(msg);
			});
		});
	}
});
```

### ウィンドウの生成

サブウィンドウを生成するには、`cmn/BaseWindow.mts` の `createWindow()` メソッドを呼び出すだけで簡単に実装できます。

```typescript
public static createWindow(title: string = "MainWindow", coord?: Coord, preload?: string): BrowserWindow
```

#### `title`
ウィンドウのタイトルを指定します。

#### `coord`
ウィンドウのサイズおよび位置を指定するオブジェクトです。
`Coord` インターフェースで定義されており、以下のような構造を持ちます：

```typescript
export interface Coord{
	width: number;
	height: number;
	x: number;
	y: number;
}
```
不要な場合は、引数を省略するか `undefined` を指定します。

#### `preload`
プリロードスクリプトを指定します。  
不要な場合は省略可能です。

### メッセージ表示

メッセージダイアログの表示には、`cmn/BaseWindow.mts` の以下のメソッドを使用します。

```typescript
public static alert(type: number, message: string, title?: string): void
```

#### `type`
メッセージの種類を指定します。`1` を指定するとエラーメッセージ、それ以外は通常メッセージになります。

#### `message`
表示するメッセージの本文。

#### `title`
ダイアログのタイトル（省略可能）。


確認ダイアログを表示するには、次のメソッドを使用します：

```typescript
public static confirm(message: string): boolean
```

#### `message`
確認ダイアログに表示するメッセージ本文。

## License

See [LICENSE](./LICENSE) for details.
