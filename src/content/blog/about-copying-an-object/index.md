---
title: "オブジェクトタイプのコピーについて"
date: "2021-08-14"
---

## はじめに
オブジェクトのコピーについて学習したのでまとめました。間違っている箇所などありましたら、TwitterのDMなどでご指摘いただけると幸いです。

## シャローコピー
シャローコピーとは１階層目の深さのコピーのことを言います。
オブジェクトタイプをシャローコピーする場合、一般的な方法としてスプレッド構文があります。

```typescript
const japan = { total: 58 };

const copyJapan = { ...japan };

copyJapan.total = 1000;

console.log(japan);      // {total: 58}
console.log(copyJapan);  // {total: 1000}
```

上記のようにスプレッド構文を用いれば、元のデータとなる`japan.total`のデータを書き換えることなくコピーができます。

### シャローコピーで気をつけること
シャローコピーは１階層目の深さのコピーしかしてくれないので、２階層目にあるデータを書き換えた場合を見ていきたいと思います。

```typescript
const japan = {
  total: 58,
  byColor: { gold: 27, silver: 14, bronze: 17 },
};

const copyJapan = { ...japan };

copyJapan.total = 1000;
copyJapan.byColor.gold = 5000;

console.log(japan);      // {total: 58, byColor: {gold: 5000, silver: 14, bronze: 17}}
console.log(copyJapan);  // {total: 1000, byColor: {gold: 5000, silver: 14, bronze: 17}}
```

コピーしたデータ`copyJapan`の`total`を`1000`、`byColor.gold`を`5000`に変更しました。結果として以下のようになりました。
- `japan`
  - １階層目の`total: 58`は影響を受けていない
  - ２階層目の`byColor: { gold: 5000,...}`に変更されてしまったので影響を受けている
- `copyJapan`
  - １階層目の`total: 1000`に変更された
  - ２階層目の`byColor: { gold: 5000,...}`に変更に変更された

上記の結果よりシャローコピーによってコピーされたデータの２階層目以降を変更した場合、コピー元も変更されてしまうという結果になりました。
このような問題を解決するにはディープコピーをする必要があります。

## ディープコピー
ディープコピーは階層の深さに関係なく全てすることをコピーしてくれます。ディープコピーをする方法としては主に２つあります。
1. `JSON.parse(JSON.stringify())` を使用する
2. `lodash/cloneDeep`を使用する

### 1. JSON.parse(JSON.stringify()) を使用する
`JSON.stringify()`でJSON文字列に変換し、`JSON.parse()`で文字列からJavaScriptの値やオブジェクトを構築することによってディープコピーを可能
にします。それでは先程の例をもとに使用したいと思います。

```typescript
const japan = {
  total: 58,
  byColor: { gold: 27, silver: 14, bronze: 17 },
};

const copyJapan = JSON.parse(JSON.stringify(japan));

copyJapan.total = 1000;
copyJapan.byColor.gold = 5000;

console.log(japan);      // {total: 58, byColor: {gold: 27, silver: 14, bronze: 17}}
console.log(copyJapan);  // {total: 1000, byColor: {gold: 5000, silver: 14, bronze: 17}}
```

上記の結果のようにコピーされたデータの２階層目以降を変更した場合もコピー元である`japan`には影響しなくなりました。
&nbsp;  
&nbsp;  
しかし、`JSON.parse(JSON.stringify())`を使用するディープコピーも気をつけることがあります。

### JSON.parse(JSON.stringify()) を使用するディープコピーで気をつけること
`JSON.parse(JSON.stringify())`の使用で気をつけることは`Date`、`undefined`、関数を`value`としてもつ場合です。
実際に記述してみました。

```typescript
const data = {
  key1: new Date(),
  key2: undefined,
  key3: () => console.log('key3'),
};

const copyData = JSON.parse(JSON.stringify(data));

console.log(data);      // {key1: Thu Aug 12 2021 18:20:59 GMT+0900 (日本標準時), key2: undefined key3: () => console.log('key3')}
console.log(copyData);  // {key1: "2021-08-12T09:20:59.194Z"}
```
上記の結果より`copyData`は以下のようになりました。
- `Date`は文字列のままになる。また、時間を見ると９時間前になっている
- `undefined`は`key`、`value`ごと無くなってしまう
- 関数は`key`、`value`ごと無くなってしまう
どうしてこのような結果になったのか`JSON.stringify()`のみを使用して見ていきたいと思います。

```typescript
const data = {
  key1: new Date(),
  key2: undefined,
  key3: () => console.log('key3'),
};

const copyData = JSON.stringify(data);

console.log(copyData);  // {key1: "2021-08-12T09:20:59.194Z"}
```  

`JSON.stringify()`にてJSON文字列に変換した時点で先程の結果と同じになりました。それではそれぞれの値を`JSON.stringify()`で変換し、挙動を見ていきます。

#### ① DateをJSON.stringify()で変換
[Mozilla](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
によると`Date`を`JSON.stringify()`を用いて変換すると以下のように実行されます。

> `Date`のインスタンスは文字列を返す `toJSON()` を実装しています (`date.toISOString()` と同じです)。したがって、これらは文字列として扱われます。

`toJSON()`を実行しているそうです。そこで、`toJSON()`について
[Mozilla](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)
にて調べてみますと、次のように実行しています。
>`toISOString()` を使用して `Date` を表す文字列を返します
 
ということで、`toISOString()`について調べたところ以下のように変換して値を返します。
- 文字列にする
- 協定世界時に基づいた日付を返す。

実際に`JSON.stringify()`と`toISOString()`を使用して比較したところ以下のように同じ値になりました。

```typescript
const data = { date: new Date() };

const copyData = JSON.stringify(data);
const toStringDate = { date: new Date().toISOString() };

console.log(copyData);     // {"date": "2021-08-12T11:15:58.232Z"}
console.log(toStringDate); // {date: "2021-08-12T11:15:58.232Z"}
```

これらの事から`Date`を`JSON.stringify()`で変換すると、協定世界時と日本標準時の時差、つまり９時間前の時間が文字列で返ってくると考えられます。
文字列となった`Date`を`JSON.parse()`で解析しても文字列のまま返ってくるということになります。

#### JSON文字列化されたDateをJSON.parse()でDate型に変換するには
すでに文字列になってしまった`Date`を`Date`型に戻すには`JSON.parse()`の第２引数に関数と定義する必要があります。`JSON.parse()`の構文は以下のようになります。
> JSON.parse(text)&nbsp;  
> JSON.parse(text, reviver)

`reviver`は以下のような仕様になります。
- `reviver`は省略可能な関数である
- 第１引数に`key`、第２引数が`value`になる
これらを踏まえ次のような関数を記述しました。

```typescript
const data = {
  date: new Date(),
  toDoContent: '買い物',
};

const copyData = JSON.stringify(data);
const parseCopyData = JSON.parse(copyData, (key, value) => {
  if (key === 'date') {
    return new Date(value);
  }

  return value;
});

console.log(data);          // {date: Fri Aug 13 2021 02:19:47 GMT+0900 (日本標準時), toDoContent: "買い物"}
console.log(parseCopyData); // {date: Fri Aug 13 2021 02:19:47 GMT+0900 (日本標準時), toDoContent: "買い物"}
```
- 条件と合致したら`new Date()`で`Date`型に変換するようにしました
- しかし、`new Date()`はブラウザごとに違う結果が返ってくるので、また別の機会に最適な方法を探したいと思います。

#### ② undefined、関数をJSON.stringify()で変換
[Mozilla](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
によると`undefined`や関数を用いて変換すると以下のように実行されます。

> `undefined`、 関数 (`Function`)、シンボル (`Symbol`) は有効な `JSON` 値ではありません。変換中にそのような値に遭遇した場合は、 (オブジェクトの中で発見された場合は) 省略されたり、 (配列の中で見つかった場合は) `null` に変換されたりします。

実際に以下のように記述してみました。ついでに配列の場合も試しました。

```typescript
// オブジェクト
const data = {
  key1: undefined,
  key2: () => console.log('key2'),
};
const copyData = JSON.stringify(data);

console.log(copyData);  // {}


// 配列
const ary = [undefined, () => console.log('key2')];
const copyAry = JSON.stringify(ary);

console.log(copyAry);  // [null, null]
```
Mozillaに記載されていた通りの結果になりました。
- オブジェクトの場合は省略
- 配列の場合は`null`を返す。

この事から`undefined`と関数を`JSON.parse(JSON.stringify())`でディープコピーをするとJSON文字列に変換する時点で`key`、`value`ごと省略されていました。

&nbsp;  
**これらの事から`JSON.parse(JSON.stringify())`を使用するディープコピーは扱うデータによって気をつけることがあります。**

### 2. lodash/cloneDeep を使用する
最後にディープコピーを行うために、ライブラリ`lodash`の`cloneDeep()`メソッドを使用していきたいと思います。まずは、`lodash`をインストールします。
```shell script
> npm i lodash
```
`TypeScript`で開発している場合は型定義ファイルもインストールします。
```shell script
> npm i -D @types/lodash
```
以下のようにインポートします。
```typescript
import cloneDeep from 'lodash/cloneDeep';
```

実際に使用してみます。
```typescript
const japan = {
  total: 58,
  byColor: { gold: 27, silver: 14, bronze: 17 },
};

const copyJapan = cloneDeep(japan);

copyJapan.total = 1000;
copyJapan.byColor.gold = 5000;

console.log(japan);      // {total: 58, byColor: {gold: 27, silver: 14, bronze: 17}}
console.log(copyJapan);  // {total: 1000, byColor: {gold: 5000, silver: 14, bronze: 17}}
```
コピーしたオブジェクト`copyJapan`に変更を加えてもコピー元の`japan`には影響ない事が確認できます。
それでは、`Date`、`undefined`、関数を`value`として持っている場合はどうなるでしょうか。

```typescript
const data = {
  key1: new Date(),
  key2: undefined,
  key3: () => console.log('key3'),
};

const copyData = cloneDeep(data);

console.log(data);     // {key1: Sat Aug 14 2021 22:34:54 GMT+0900 (日本標準時) {}, key2: undefined, key3: () => console.log('key3')}
console.log(copyData); // {key1: Sat Aug 14 2021 22:34:54 GMT+0900 (日本標準時) {}, key2: undefined, key3: () => console.log('key3')}
```

問題なくコピーできている事が確認できます。

## まとめ
- ２階層目以降のデータを変更する予定がない場合は、基本的にシャローコピーを使用していきます
- ディープコピーをする際は、以下の理由から`lodash/cloneDeep`を使用していきたいと思います
  - ライブラリをインストールする必要はあるが容易に実装できる
  - データの型に関係なく確実にコピーが行える