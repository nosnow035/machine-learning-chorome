// 1. 拡張機能がインストールされた時に、右クリックメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "hiragana-to-a-popup",
    title: "ひらがなを「A」に変換 (ポップアップ)",
    contexts: ["selection"]
  });
});

// 2. 右クリックメニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "hiragana-to-a-popup") {

    const selectedText = info.selectionText;
    const hiraganaRegex = /[\u3040-\u309F]/g;
    const transformedText = selectedText.replace(hiraganaRegex, 'A');

    // ✅ popup.css をページに挿入
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["popup.css"]
    });

    // ✅ showPopup関数を実行
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showPopup,
      args: [transformedText, info.selectionText]
    });
  }
});

// ✅ ポップアップ生成関数
function showPopup(resultText, originalText) {
  // 古いポップアップがあれば削除
  const oldPopup = document.getElementById('furigana-popup-by-extension');
  if (oldPopup) oldPopup.remove();

  // --- ポップアップ本体 ---
  const popup = document.createElement('div');
  popup.id = 'furigana-popup-by-extension'; // CSSが適用されるID

  // --- 変換前テキスト ---
  const original = document.createElement('div');
  original.textContent = originalText;
  original.className = 'original-text'; // CSS側のクラスを適用
  popup.appendChild(original);

  // --- 変換後テキスト ---
  const result = document.createElement('div');
  result.textContent = resultText;
  result.className = 'result-text'; // CSS側のクラスを適用
  popup.appendChild(result);

  // --- ページに追加 ---
  document.body.appendChild(popup);

  // --- 位置調整 ---
  const selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  popup.style.left = `${selectionRect.left + window.scrollX}px`;
  popup.style.top = `${selectionRect.bottom + window.scrollY + 5}px`;

  // --- 外をクリックしたら削除 ---
  function handleClickOutside(event) {
    if (!popup.contains(event.target)) {
      popup.remove();
      document.removeEventListener('click', handleClickOutside);
    }
  }
  setTimeout(() => document.addEventListener('click', handleClickOutside), 100);
}
