import styles from './Footer.module.sass';

export function Footer() {
  const iconsData = [
    {
      src: 'img/footer/twitter.png',
      alt: 'twitter',
      link: 'http://twitter.com',
    },
    {
      src: 'img/footer/facebook.png',
      alt: 'facebook',
      link: 'http://facebook.com',
    },
    {
      src: 'img/footer/instagram.png',
      alt: 'instagram',
      link: 'http://instagram.com',
    }
  ]

  return (
    <footer className={styles.footer}>
      <span className={styles.caption}>
        &copy; 2017-2020 QEX, - системный интегратор решений автоматизации продаж
      </span>
      <div className={styles.icons}>
        {iconsData.map(({ link, src, alt }) => (
          <a
            key={Math.random()}
            className={styles.ref}
            href={link} target="_blank"
            rel="noopener noreferrer"
          >
            <img src={src} alt={alt} />
          </a>
        ))}
      </div>
    </footer>
  );
}