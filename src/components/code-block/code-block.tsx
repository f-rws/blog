import { CodeComponent, ReactMarkdownNames } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeBlock: CodeComponent | ReactMarkdownNames = ({ children, inline, className }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1];
  const formatCodeBlock = String(children).replace(/\n$/, ''); // コードブロックの最後の改行を削除している

  return !inline && language ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      PreTag={'div'}
      customStyle={{ margin: '0', padding: '0', backgroundColor: '#212121' }}
    >
      {formatCodeBlock}
    </SyntaxHighlighter>
  ) : (
    <code>{children}</code>
  );
};
