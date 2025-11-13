# machine-learning-chorome
大学で機械学習のプロジェクトを行いました。
機械学習を用いた振り仮名chorome拡張機能です。

モデルとデータセットの生成は、Google Colabで行いました。

サーバーもgoogle colabで行い、フロントエンドは途中ですがjsとhtmlで行いました。

データセットは漢字文と振り仮名文を形態素解析のsudachiを解答として学習させた。
モデルはT5を使用

<a href="https://tus.box.com/s/z6u8i0xp5nbkgky86etx5ifnee2kanv6" target="_blank">完成したモデルをboxに置きました。ファイルが2GB近くあります。こちらを押してください。</a>

サーバーの
APIserver_base.ipynbファイルについて

ユーザーが入力したメッセージを、ngrok 上の Public な API エンドポイントに送信する

API サーバーでメッセージを受け付け、LLM 推論結果を返却する

ngrok（後述）で公開する Public URL を経由して、localhost の API エンドポイントにユーザーメッセージを含んだ HTTP Request が届く

FastAPI（後述）によって、届いたリクエストを処理する

Colab 上で LLM 推論を実行する。



推論が完了したら、実行結果を HTTP Response としてリクエスト元に返却する
推論結果が無事にユーザーに届く 🙌




