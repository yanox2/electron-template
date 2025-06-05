# electron-template

This package provides a set of common modules for developing Electron applications using TypeScript.  
All code is written in **ES Modules (ESM)** format, and it assumes that your application will also follow the ESM structure.

## Introduction

This template simplifies the initial setup of an Electron application.  
It allows you to create windows and menus easily through function calls and method overrides.

The template includes the following features by default:

- A configuration file that saves window size and position on exit, and restores them on the next launch
- A preload script for communication between the renderer and main processes
- A custom exception class
- A file handling utility class

## Installation

```bash
npm install
```

## Usage

To transpile the TypeScript source code:

```bash
npm run tsc
```

To launch the application without any modifications (a default window will appear):

```bash
npm run start
```

![app window](./images/001.png)

A default menu is also displayed automatically (note: the menu does not perform any actions).

![menu](./images/002.png)

### Implementing Your Application

### Initializing `MyApp.mts`

First, implement the initialization method in `MyApp.mts`:

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

The `init()` method of the `BaseWindow` class initializes the Electron application and creates a window:

```typescript
public async init(loadFile: string, preloadFile?: string, lis?: CloseListener)
```

#### `loadFile`
Specifies the HTML file to display.
By default, it loads `dist/main.html`.

#### `preloadFile`
Specifies the preload script.
The default preload script defines a communication bridge between the main and renderer processes.
If you don't need a preload script, you can omit this argument or pass `undefined`.

```typescript
// File: src/ipc/preload.cts
contextBridge.exposeInMainWorld("MyBridge", {
	testSend: (no: number) => ipcRenderer.invoke("testSend", no),
});
```
> **Note**
>  The preload script must be written in [CommonJS format](https://blog.softwarenote.info/p4891/).

#### `lis`
Specifies a listener that runs when the window is closed.
The default listener saves the window size and position to a configuration file.
This listener is implemented in the base class and works by simply passing `this`.
You may omit it if not needed.

### Entry Point: `main.mts`

The `MyApp` class is invoked from `main.mts`.
If you change the class name, update it in `main.mts` as well:

```typesciprt
// File: src/main.mts
import MyApp from "./MyApp.mjs";

const main = async () => {
	const appBase: AppBase = new MyApp();
	await appBase.init();
};
```

### Initializing `MyWindow.mts`

Next, implement the initialization method in `MyWindow.mts`:

```typescript
// File: src/MyWindow.mts
protected async myInit(){
	this.win?.webContents.openDevTools();
}
```

By default, this simply opens the Developer Tools window.
You can expand upon this to implement your application's logic.

## Notes

※ Add any additional notes here as needed.

## License

This project is licensed under the MIT License, with the Commons Clause restriction.

See [LICENSE](./LICENSE) for details.
