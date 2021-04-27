import React from 'react';
import styles from './about-us.module.css';
import romanImg from '../../assets/images/Roman.jpg';
import gazizImg from '../../assets/images/Gaziz.jpg';
import eugenImg from '../../assets/images/Eugen.jpg';
import elenaImg from '../../assets/images/Elena.jpg';
import julieImg from '../../assets/images/Julie.jpg';

export const AboutUs: React.FC = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>О команде</h2>
    <div className={styles.inner}>
      <div className={styles.person}>
        <img
          className={styles.image}
          src={romanImg}
          width="100px"
          height="100px"
          alt="Roman"
        />
        <div className={styles.text__wrapper}>
          <h3 className={styles.name}>Роман:</h3>
          <p className={styles.text}>
            Разработка мини-игры "Конструктор", страниц "Cтартовой" и "О
            Команде". Подключение "Графика", "Выбор уровня", "FullScreen".
          </p>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Rrroman"
          >
            https://github.com/Rrroman
          </a>
        </div>
      </div>
      <div className={styles.person}>
        <img
          className={styles.image}
          src={gazizImg}
          width="100px"
          height="100px"
          alt="Gaziz"
        />
        <div className={styles.text__wrapper}>
          <h3 className={styles.name}>Газиз:</h3>
          <p className={styles.text}>
            Team Lead. Разработка архитектуры приложения, подключение и
            настройка бэкенда, сервисы взаимодействия с бэкендом, компоненты
            “Тестирование”, “Статистика”, “Авторизация”, “Главная страница”
          </p>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Gaziz666"
          >
            https://github.com/Gaziz666
          </a>
        </div>
      </div>
      <div className={styles.person}>
        <img
          className={styles.image}
          src={eugenImg}
          width="100px"
          height="100px"
          alt="Eugen"
        />
        <div className={styles.text__wrapper}>
          <h3 className={styles.name}>Евгений:</h3>
          <p className={styles.text}>
            Разработка компонентов "Словарь" и "Учебник"
          </p>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/evgeshabond"
          >
            https://github.com/evgeshabond
          </a>
        </div>
      </div>
      <div className={styles.person}>
        <img
          className={`${styles.image} ${styles.image_lena}`}
          src={elenaImg}
          width="100px"
          height="100px"
          alt="Elena"
        />
        <div className={styles.text__wrapper}>
          <h3 className={styles.name}>Елена:</h3>
          <p className={styles.text}>Разработка игр "Аудиовызов" и "Саванна"</p>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/general-m"
          >
            https://github.com/general-m
          </a>
        </div>
      </div>
      <div className={styles.person}>
        <img
          className={`${styles.image} ${styles.image_lena}`}
          src={julieImg}
          width="100px"
          height="100px"
          alt="Julie"
        />
        <div className={styles.text__wrapper}>
          <h3 className={styles.name}>Юлия:</h3>
          <p className={styles.text}>
            Создание игры "Спринт", видео о функциональности приложения.
          </p>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/juliememe"
          >
            https://github.com/juliememe
          </a>
        </div>
      </div>
    </div>
  </div>
);
