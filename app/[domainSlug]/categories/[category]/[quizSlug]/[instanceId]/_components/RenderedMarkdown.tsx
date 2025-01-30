import './rendered-markdown.css';

interface RenderedMarkdownProps {
  html: string;
}

const RenderedMarkdown = ({
  html,
}: RenderedMarkdownProps) => (
  // eslint-disable-next-line react/no-danger
  <div className="pointer-events-none" dangerouslySetInnerHTML={{ __html: html }} />
);

export default RenderedMarkdown;
