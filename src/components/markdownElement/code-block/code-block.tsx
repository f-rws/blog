import { CodeComponent, ReactMarkdownNames } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeBlock: CodeComponent | ReactMarkdownNames = ({ children, inline, className }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1];
  const formatCodeBlock = String(children).replace(/\n$/, ''); // コードブロックの最後の改行を削除している
  const primaryFontColor = language === ('typescript' || 'javascript') ? '#a8dcfa' : '#fff';

  const codeTagProps: SyntaxHighlighterProps['codeTagProps'] = {
    style: { fontFamily: 'Fira Code', fontSize: '14px', color: primaryFontColor },
  };

  const customStyle: SyntaxHighlighterProps['customStyle'] = {
    backgroundColor: '#15181B',
    borderRadius: '.25em',
    padding: '1.75em',
    margin: '1.5em 0',
    overflowX: 'auto',
  };

  return !inline && language ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      PreTag={'div'}
      codeTagProps={codeTagProps}
      customStyle={customStyle}
    >
      {formatCodeBlock}
    </SyntaxHighlighter>
  ) : (
    <code>{children}</code>
  );
};
