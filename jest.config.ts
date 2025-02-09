/**
 * 各設定プロパティの詳細な説明については、以下を参照してください:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	// テスト環境で next.config.js と .env ファイルを読み込むために、Next.js アプリケーションのパスを指定します
	dir: './src',
});

const config: Config = {
	// カバレッジのためにコードをインストゥルメントするプロバイダーを示す
	coverageProvider: 'v8',
	// テストに使用されるテスト環境
	testEnvironment: 'jsdom',
	// モジュールが使用するファイル拡張子の配列
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	// リソースを単一のモジュールでスタブアウトするための正規表現からモジュール名またはモジュール名の配列へのマップ
	moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },

	// 各テストの前にテストフレームワークを設定または構成するためにいくつかのコードを実行するモジュールのパスのリスト
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	// テストでインポートされたすべてのモジュールを自動的にモックするかどうか
	// automock: false,

	// `n` 回の失敗後にテストの実行を停止するかどうか
	// bail: 0,

	// Jest が依存関係情報をキャッシュするディレクトリ
	// cacheDirectory: "/private/var/folders/ws/jn236b450_q6br3sth3n42x00000gn/T/jest_dx",

	// 各テストの前にモックの呼び出し、インスタンス、コンテキスト、および結果を自動的にクリアするかどうか
	// clearMocks: true,

	// テストの実行中にカバレッジ情報を収集するかどうか
	// collectCoverage: true,

	// カバレッジ情報を収集するファイルのセットを示すグロブパターンの配列
	// collectCoverageFrom: undefined,

	// Jest がカバレッジファイルを出力するディレクトリ
	// coverageDirectory: 'coverage',

	// カバレッジ収集をスキップするために使用される正規表現パターンの配列
	// coveragePathIgnorePatterns: [
	//   "/node_modules/"
	// ],

	// カバレッジレポートを書き込むときに Jest が使用するレポーター名のリスト
	// coverageReporters: [
	//   "json",
	//   "text",
	//   "lcov",
	//   "clover"
	// ],

	// カバレッジ結果の最小しきい値を強制するための設定オブジェクト
	// coverageThreshold: undefined,

	// カスタム依存関係抽出器へのパス
	// dependencyExtractor: undefined,

	// 非推奨の API を呼び出すと役立つエラーメッセージをスローするかどうか
	// errorOnDeprecated: false,

	// フェイクタイマーのデフォルト設定
	// fakeTimers: {
	//   "enableGlobally": false
	// },

	// グロブパターンの配列を使用して無視されたファイルからカバレッジ収集を強制するかどうか
	// forceCoverageMatch: [],

	// すべてのテストスイートの前に一度トリガーされる非同期関数をエクスポートするモジュールへのパス
	// globalSetup: undefined,

	// すべてのテストスイートの後に一度トリガーされる非同期関数をエクスポートするモジュールへのパス
	// globalTeardown: undefined,

	// すべてのテスト環境で利用可能である必要があるグローバル変数のセット
	// globals: {},

	// テストの実行に使用される最大ワーカー数。% または数値で指定できます。例: maxWorkers: 10% は CPU 数量の 10% + 1 を最大ワーカー数として使用します。maxWorkers: 2 は最大 2 ワーカーを使用します。
	// maxWorkers: "50%",

	// モジュールの場所から再帰的に検索されるディレクトリ名の配列
	// moduleDirectories: [
	//   "node_modules"
	// ],

	// モジュールローダーに「見える」と見なされる前に、すべてのモジュールパスに対して一致する正規表現パターンの配列
	// modulePathIgnorePatterns: [],

	// テスト結果の通知を有効にするかどうか
	// notify: false,

	// 通知モードを指定する列挙型。{ notify: true } が必要です
	// notifyMode: "failure-change",

	// Jest の設定のベースとして使用されるプリセット
	// preset: undefined,

	// 1 つ以上のプロジェクトからテストを実行するかどうか
	// projects: undefined,

	// Jest にカスタムレポーターを追加するための設定オプション
	// reporters: undefined,

	// 各テストの前にモック状態を自動的にリセットするかどうか
	// resetMocks: false,

	// 各テストの前にモジュールレジストリをリセットするかどうか
	// resetModules: false,

	// カスタムリゾルバへのパス
	// resolver: undefined,

	// 各テストの前にモック状態と実装を自動的に復元するかどうか
	// restoreMocks: false,

	// Jest がテストとモジュールをスキャンするルートディレクトリ
	// rootDir: undefined,

	// Jest がファイルを検索するために使用するディレクトリのパスのリスト
	// roots: [
	//   "<rootDir>"
	// ],

	// Jest のデフォルトのテストランナーの代わりにカスタムランナーを使用できるようにするかどうか
	// runner: "jest-runner",

	// 各テストの前にテスト環境を設定または構成するためにいくつかのコードを実行するモジュールへのパス
	// setupFiles: [],

	// テストが遅いと見なされ、結果にそのように報告されるまでの秒数
	// slowTestThreshold: 5,

	// スナップショットテストのために Jest が使用するスナップショットシリアライザーモジュールのパスのリスト
	// snapshotSerializers: [],

	// testEnvironment に渡されるオプション
	// testEnvironmentOptions: {},

	// テスト結果にロケーションフィールドを追加するかどうか
	// testLocationInResults: false,

	// テストファイルを検出するために Jest が使用するグロブパターン
	// testMatch: [
	//   "**/__tests__/**/*.[jt]s?(x)",
	//   "**/?(*.)+(spec|test).[tj]s?(x)"
	// ],

	// 一致するテストがスキップされるすべてのテストパスに対して一致する正規表現パターンの配列
	// testPathIgnorePatterns: [
	//   "/node_modules/"
	// ],

	// テストファイルを検出するために Jest が使用する正規表現パターンまたはパターンの配列
	// testRegex: [],

	// カスタム結果プロセッサーを使用できるようにするオプション
	// testResultsProcessor: undefined,

	// カスタムテストランナーを使用できるようにするオプション
	// testRunner: "jest-circus/runner",

	// トランスフォーマーへのパスの正規表現からのマップ
	// transform: undefined,

	// すべてのソースファイルパスに対して一致する正規表現パターンの配列、一致するファイルは変換をスキップします
	// transformIgnorePatterns: [
	//   "/node_modules/",
	//   "\\.pnp\\.[^\\/]+$"
	// ],

	// モジュールローダーが自動的にモックを返す前に、すべてのモジュールに対して一致する正規表現パターンの配列
	// unmockedModulePathPatterns: undefined,

	// 実行中に各個別のテストを報告するかどうか
	// verbose: undefined,

	// ウォッチモードでテストを再実行する前にすべてのソースファイルパスに対して一致する正規表現パターンの配列
	// watchPathIgnorePatterns: [],

	// ファイルクロールに watchman を使用するかどうか
	// watchman: true,
};

export default createJestConfig(config);
