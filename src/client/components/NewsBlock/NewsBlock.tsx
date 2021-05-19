import styles from './NewsBlock.module.sass';

export type TNewsBlockProps = {
  urlToImage: string;
  url: string;
  title: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

export function NewsBlock({news}: { news: TNewsBlockProps }) {
  const {urlToImage, url, title, publishedAt, source} = news;

  return (
    <div className={styles.newsBlock}>
      <img className={styles.image} alt="" src={urlToImage}/>
      <h3 className={styles.newsTitle}>
        <a href={url} rel="noopener noreferrer" target="_blank">
          {title}
        </a>
      </h3>
      <div className={styles.source}>
        <span className={styles.sourceDate}>
          {new Date(publishedAt).toDateString()}
        </span>
        <span className={styles.sourceName}>
          {source.name}
        </span>
      </div>
    </div>
  );
}