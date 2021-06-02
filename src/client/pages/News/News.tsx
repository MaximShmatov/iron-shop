import { useDispatch, useSelector } from 'react-redux';
import { fetchTopHeadlines, fetchFromKeywords } from '../../api/news';
import { setNewsList } from '../../store/newsSlice';
import { setMessage } from '../../store/snackbarSlice';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import {NewsBlock, TNewsBlockProps} from '../../components/NewsBlock/NewsBlock';
import styles from './News.module.sass';


export default function News() {
  const dispatch = useDispatch();
  const news = useSelector(({ news }) => news.newsList)

  // if (!news.length) {
  //   fetchTopHeadlines('ru')
  //     .then((data) => {
  //       if (data.status === 'ok') {
  //         dispatch(setNewsList(data.articles));
  //       } else {
  //         dispatch(setMessage(`${data.status}: limit reached...`));
  //       }
  //     })
  //     .catch((error) => dispatch(setMessage(error.toString())));
  // }

  const handleFormSubmit = (keyword: string) => {
    if (keyword !== '') {
      fetchFromKeywords(keyword)
        .then((data) => {
          if (data.status === 'ok') {
            dispatch(setNewsList(data.articles));
          } else {
            dispatch(setMessage(`${data.status}: Limit reached...`));
          }
        })
        .catch((error) => {
          dispatch(setMessage(error.toString()));
        });
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>
          News
        </h1>
        <SearchForm
          onSubmit={handleFormSubmit}
          placeholder={'Поиск по новостям'}
        />
      </div>
      {news.map((item: TNewsBlockProps) => (
        <div key={item.url}>
          <hr className={styles.separator} />
          <NewsBlock news={item} />
        </div>)
      )}
    </main>
  );
}