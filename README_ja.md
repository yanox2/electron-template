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

![app window](./images/001.png)

初期状態では、メニューも自動的に表示されます（※機能は未実装です）。

![menu](./images/002.png)

### 自身のアプリケーションの実装方法

### `MyApp.mts` の初期化

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
public async init(loadFile: string, preloadFile?: string, lis?: CloseListener)
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

### `MyWindow.mts` の初期化

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

※補足事項があればここに記載してください。

## License

This project is licensed under the MIT License, with the Commons Clause restriction.

See [LICENSE](./LICENSE) for details.
