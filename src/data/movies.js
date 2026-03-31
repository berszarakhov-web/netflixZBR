export const GENRES = [
  'Все', 'Боевик', 'Комедия', 'Драма',
  'Фэнтези', 'Триллер', 'Ужасы', 'Фантастика', 'Аниме'
]

// ── Фильмы ───────────────────────────────────────────────────
export const movies = [
  {
    id: 1, title: 'Дюна: Часть вторая', year: 2024,
    genres: ['Фантастика', 'Боевик'], rating: 8.5,
    description: 'Пол Атрейдес объединяется с Чани и фрименами, стремясь отомстить заговорщикам, уничтожившим его семью.',
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    duration: 166, age: 16, trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w', type: 'movie',
  },
  {
    id: 2, title: 'Оппенгеймер', year: 2023,
    genres: ['Драма', 'Триллер'], rating: 8.9,
    description: 'История Дж. Роберта Оппенгеймера и его роли в разработке атомной бомбы в рамках Манхэттенского проекта.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    duration: 180, age: 16, trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg', type: 'movie',
  },
  {
    id: 3, title: 'Интерстеллар', year: 2014,
    genres: ['Фантастика', 'Драма'], rating: 9.0,
    description: 'Когда засуха, пыльные бури и вымирание растений приводят человечество к кризису, исследователи проходят через червоточину.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    duration: 169, age: 12, trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E', type: 'movie',
  },
  {
    id: 4, title: 'Начало', year: 2010,
    genres: ['Боевик', 'Триллер', 'Фантастика'], rating: 8.8,
    description: 'Вор, крадущий корпоративные секреты из снов людей, получает задание внедрить идею в подсознание.',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg',
    duration: 148, age: 12, trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0', type: 'movie',
  },
  {
    id: 5, title: 'Джокер', year: 2019,
    genres: ['Драма', 'Триллер'], rating: 8.4,
    description: 'История происхождения самого известного злодея DC — неудачливого комика Артура Флека.',
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1ZqieMLkXQO.jpg',
    duration: 122, age: 18, trailerUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY', type: 'movie',
  },
  {
    id: 6, title: 'Аватар 2', year: 2022,
    genres: ['Фантастика', 'Боевик'], rating: 7.6,
    description: 'Джейк Салли живёт со своей семьёй на Пандоре. Когда угроза возвращается, он вынужден исследовать регионы Пандоры.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwpaWgCQ2aHHZCQu.jpg',
    duration: 192, age: 12, trailerUrl: 'https://www.youtube.com/embed/a8Gx8wiNbs8', type: 'movie',
  },
  {
    id: 7, title: 'Матрица', year: 1999,
    genres: ['Боевик', 'Фантастика'], rating: 8.7,
    description: 'Хакер Нео узнаёт, что его мир — симуляция, и присоединяется к борцам с машинами.',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    duration: 136, age: 16, trailerUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8', type: 'movie',
  },
  {
    id: 8, title: 'Властелин колец: Братство кольца', year: 2001,
    genres: ['Фэнтези', 'Боевик'], rating: 9.1,
    description: 'Молодой хоббит Фродо вместе с отрядом отправляется уничтожить Кольцо всевластья.',
    poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/mfwq2nMBmAL7CUzV0v1RQlLSN1C.jpg',
    duration: 178, age: 12, trailerUrl: 'https://www.youtube.com/embed/V75dMMIW2B4', type: 'movie',
  },
  {
    id: 9, title: 'Тёмный рыцарь', year: 2008,
    genres: ['Боевик', 'Триллер', 'Драма'], rating: 9.0,
    description: 'Бэтмен сталкивается с самым опасным противником — Джокером, сеющим хаос в Готэме.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    duration: 152, age: 16, trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY', type: 'movie',
  },
  {
    id: 10, title: 'Схватка', year: 1995,
    genres: ['Боевик', 'Триллер', 'Драма'], rating: 8.3,
    description: 'Легендарное противостояние: профессиональный вор и детектив, каждый — лучший в своём деле.',
    poster: 'https://image.tmdb.org/t/p/w500/zNzBrLlOBFpQJFbhAMIRNjFUkAh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rfBEtMxMGMBrRrNhE1KuqcCBNpT.jpg',
    duration: 170, age: 18, trailerUrl: 'https://www.youtube.com/embed/op5qXyFt4Dg', type: 'movie',
  },
  {
    id: 11, title: 'Гравитация', year: 2013,
    genres: ['Фантастика', 'Триллер', 'Драма'], rating: 7.7,
    description: 'Два астронавта застряли в открытом космосе после разрушения шаттла.',
    poster: 'https://image.tmdb.org/t/p/w500/6LopHSh5WVMF5PVBP2TGhqPKONB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/3ycH4IzJoQWGdYUmtJTm3Av7cPH.jpg',
    duration: 91, age: 12, trailerUrl: 'https://www.youtube.com/embed/OiTiKOy59o4', type: 'movie',
  },
  {
    id: 12, title: 'Марсианин', year: 2015,
    genres: ['Фантастика', 'Драма'], rating: 8.0,
    description: 'Астронавт остаётся один на Марсе и должен найти способ выжить.',
    poster: 'https://image.tmdb.org/t/p/w500/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/y0AzPWFPiVnGnBSVPKGoxpRBkCh.jpg',
    duration: 144, age: 12, trailerUrl: 'https://www.youtube.com/embed/ej3ioOneTy8', type: 'movie',
  },
  {
    id: 13, title: 'Паразит', year: 2019,
    genres: ['Триллер', 'Драма', 'Комедия'], rating: 8.5,
    description: 'Бедная семья постепенно проникает в жизнь богатого домовладельца — с непредсказуемыми последствиями.',
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
    duration: 132, age: 16, trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY', type: 'movie',
  },
  {
    id: 14, title: 'Отступники', year: 2006,
    genres: ['Боевик', 'Триллер', 'Драма'], rating: 8.5,
    description: 'Полиция внедряет агента в мафию, а мафия — своего в полицию. Никто не знает, кому доверять.',
    poster: 'https://image.tmdb.org/t/p/w500/kVK8bM04u2GE7gVVvhMIHCvkTrA.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8wFHlp88Kxjm7RKgaqQO4HvWRiA.jpg',
    duration: 151, age: 18, trailerUrl: 'https://www.youtube.com/embed/SGWbFFRpKrg', type: 'movie',
  },
  {
    id: 15, title: 'Форрест Гамп', year: 1994,
    genres: ['Драма', 'Комедия'], rating: 8.8,
    description: 'История простого человека с невысоким IQ, который нечаянно оказывается свидетелем ключевых событий американской истории.',
    poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/qdIMHd4sEfJSckfVJfKQvisL02a.jpg',
    duration: 142, age: 12, trailerUrl: 'https://www.youtube.com/embed/bLvqoHBptjg', type: 'movie',
  },
  {
    id: 16, title: 'Список Шиндлера', year: 1993,
    genres: ['Драма'], rating: 9.0,
    description: 'Немецкий предприниматель Оскар Шиндлер спасает более тысячи польских евреев во время Холокоста.',
    poster: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/loRmRzQXZeqG78TqZEgjHOzeQQt.jpg',
    duration: 195, age: 16, trailerUrl: 'https://www.youtube.com/embed/gG22XNhtnoY', type: 'movie',
  },
  {
    id: 17, title: 'Криминальное чтиво', year: 1994,
    genres: ['Боевик', 'Триллер', 'Комедия'], rating: 8.9,
    description: 'Переплетённые истории преступников в Лос-Анджелесе — гангстеров, боксёра и парочки грабителей.',
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    duration: 154, age: 18, trailerUrl: 'https://www.youtube.com/embed/s7EdQ4FqbhY', type: 'movie',
  },
  {
    id: 18, title: 'Бойцовский клуб', year: 1999,
    genres: ['Драма', 'Триллер'], rating: 8.8,
    description: 'Разочарованный офисный работник знакомится с харизматичным мыловаром. Вместе они создают подпольный бойцовский клуб.',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/87hTDiay2N2qWyX4Ds7ybXi9h8a.jpg',
    duration: 139, age: 18, trailerUrl: 'https://www.youtube.com/embed/SUXWAEX2jlg', type: 'movie',
  },
  {
    id: 19, title: 'Гладиатор', year: 2000,
    genres: ['Боевик', 'Драма', 'Фэнтези'], rating: 8.5,
    description: 'Римский генерал, преданный и обращённый в рабство, становится гладиатором, чтобы отомстить.',
    poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/6WBIzCgmDCYrqh64yDREGeDk9d3.jpg',
    duration: 155, age: 16, trailerUrl: 'https://www.youtube.com/embed/owK1qxDselE', type: 'movie',
  },
  {
    id: 20, title: 'Побег из Шоушенка', year: 1994,
    genres: ['Драма'], rating: 9.3,
    description: 'Невиновно осуждённый банкир подружился с заключённым контрабандистом и планирует побег.',
    poster: 'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9Xwy2gK5NZAQX11DnP5DRalSZBF.jpg',
    duration: 142, age: 16, trailerUrl: 'https://www.youtube.com/embed/NmzuHjWmXOc', type: 'movie',
  },
]

// ── Сериалы ──────────────────────────────────────────────────
// nextEpisode: ISO-дата выхода следующей серии (если сериал ещё идёт)
export const series = [
  {
    id: 101, title: 'Игра престолов', year: 2011,
    genres: ['Драма', 'Фэнтези', 'Боевик'], rating: 9.2,
    description: 'Борьба знатных семей за контроль над Железным троном Семи Королевств Вестероса.',
    poster: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
    duration: 57, age: 18, trailerUrl: 'https://www.youtube.com/embed/KPLWWIOCOOQ',
    type: 'series', seasons: 8, status: 'ended',
  },
  {
    id: 102, title: 'Во все тяжкие', year: 2008,
    genres: ['Драма', 'Триллер'], rating: 9.5,
    description: 'Учитель химии узнаёт о смертельном диагнозе и начинает варить метамфетамин.',
    poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    duration: 47, age: 18, trailerUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    type: 'series', seasons: 5, status: 'ended',
  },
  {
    id: 103, title: 'Чернобыль', year: 2019,
    genres: ['Драма', 'Триллер'], rating: 9.4,
    description: 'Реальная история катастрофы на Чернобыльской АЭС и людей, которые пожертвовали всем, чтобы спасти Европу.',
    poster: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvMZA.jpg',
    duration: 60, age: 16, trailerUrl: 'https://www.youtube.com/embed/s9APLXM9Ei8',
    type: 'series', seasons: 1, status: 'ended',
  },
  {
    id: 104, title: 'Острые козырьки', year: 2013,
    genres: ['Драма', 'Боевик', 'Триллер'], rating: 8.9,
    description: 'Гангстерская сага о семье Шелби в Бирмингеме после Первой мировой войны.',
    poster: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkPaZuH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/wiE9doxiLwq3WgEctpDWy5MYYTI.jpg',
    duration: 60, age: 18, trailerUrl: 'https://www.youtube.com/embed/oVzVdvGIC7U',
    type: 'series', seasons: 6, status: 'ended',
  },
  {
    id: 105, title: 'Мир Дикого Запада', year: 2016,
    genres: ['Фантастика', 'Драма', 'Боевик'], rating: 8.6,
    description: 'В футуристическом парке развлечений, заполненном роботами, туристы живут фантазиями.',
    poster: 'https://image.tmdb.org/t/p/w500/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/cGp4P3AoW4dBqsKzKhDLFPOiGQU.jpg',
    duration: 62, age: 18, trailerUrl: 'https://www.youtube.com/embed/bWC_4vTkFRU',
    type: 'series', seasons: 4, status: 'ended',
  },
  {
    id: 106, title: 'Корона', year: 2016,
    genres: ['Драма'], rating: 8.6,
    description: 'История о правлении королевы Елизаветы II и событиях, которые потрясли Великобританию.',
    poster: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/y2EMtz4r5mYhRY5WW5THAPQ71vM.jpg',
    duration: 58, age: 12, trailerUrl: 'https://www.youtube.com/embed/JWtnJjn6ng0',
    type: 'series', seasons: 6, status: 'ended',
  },
  {
    id: 107, title: 'Тед Лассо', year: 2020,
    genres: ['Комедия', 'Драма'], rating: 8.8,
    description: 'Американский тренер по американскому футболу отправляется в Англию тренировать профессиональный клуб.',
    poster: 'https://image.tmdb.org/t/p/w500/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/z7pSMSMpslSBSUMvY0rfJfSqxSo.jpg',
    duration: 30, age: 12, trailerUrl: 'https://www.youtube.com/embed/3u7EIiohs6U',
    type: 'series', seasons: 3, status: 'ended',
  },
  {
    id: 108, title: 'Настоящий детектив', year: 2014,
    genres: ['Драма', 'Триллер'], rating: 9.0,
    description: 'Два детектива из Луизианы расследуют серийное убийство, растянувшееся на 17 лет.',
    poster: 'https://image.tmdb.org/t/p/w500/cg4NBsq6kDQOAO2FkMdDVbhEPxV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/5BHBZ5SqOxQGGSBsAFcIxZVmHRF.jpg',
    duration: 55, age: 18, trailerUrl: 'https://www.youtube.com/embed/nywPPBWEyRw',
    type: 'series', seasons: 4, status: 'ongoing', nextEpisode: '2025-03-15',
  },
  {
    id: 109, title: 'Ход королевы', year: 2020,
    genres: ['Драма'], rating: 8.6,
    description: 'Сирота обнаруживает в детстве необычный дар к шахматам и рвётся к вершинам мастерства.',
    poster: 'https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVqqwb2.jpg',
    duration: 60, age: 12, trailerUrl: 'https://www.youtube.com/embed/CDrieqwSdgI',
    type: 'series', seasons: 1, status: 'ended',
  },
  {
    id: 110, title: 'Андор', year: 2022,
    genres: ['Фантастика', 'Боевик', 'Драма'], rating: 8.4,
    description: 'История зарождения Сопротивления — приквел к «Изгою-один». Кассиан Андор встаёт на путь революции.',
    poster: 'https://image.tmdb.org/t/p/w500/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/yk3vSdYJbkYC3oMKkYLJ3WIQUJQ.jpg',
    duration: 50, age: 12, trailerUrl: 'https://www.youtube.com/embed/cKOegEuCcfw',
    type: 'series', seasons: 2, status: 'ongoing', nextEpisode: '2025-04-22',
  },
  {
    id: 111, title: 'Последние из нас', year: 2023,
    genres: ['Драма', 'Фэнтези', 'Ужасы'], rating: 8.8,
    description: 'Постапокалипсис: контрабандист перевозит девочку с иммунитетом к смертельному грибковому вирусу.',
    poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    duration: 60, age: 18, trailerUrl: 'https://www.youtube.com/embed/uLtkt8BonwM',
    type: 'series', seasons: 2, status: 'ongoing', nextEpisode: '2025-04-13',
  },
  {
    id: 112, title: 'Дом дракона', year: 2022,
    genres: ['Драма', 'Фэнтези', 'Боевик'], rating: 8.5,
    description: 'Приквел «Игры престолов»: история Дома Таргариен и гражданская война на Вестеросе.',
    poster: 'https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
    duration: 60, age: 18, trailerUrl: 'https://www.youtube.com/embed/DotnJ7tTA34',
    type: 'series', seasons: 2, status: 'ongoing', nextEpisode: '2025-06-01',
  },
  {
    id: 113, title: 'Белый лотос', year: 2021,
    genres: ['Драма', 'Комедия', 'Триллер'], rating: 7.9,
    description: 'Антология о гостях и сотрудниках элитных курортов, скрывающих тайны и тёмные желания.',
    poster: 'https://image.tmdb.org/t/p/w500/kVLLCRHcVPOTSFZrPfCzGkqNMRV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/1Gfn2Z2NsZAKFWDpEkUs4CgOD4.jpg',
    duration: 55, age: 18, trailerUrl: 'https://www.youtube.com/embed/F0xgdMpLhk0',
    type: 'series', seasons: 3, status: 'ongoing', nextEpisode: '2025-04-06',
  },
  {
    id: 114, title: 'Пингвин', year: 2024,
    genres: ['Боевик', 'Триллер', 'Драма'], rating: 8.3,
    description: 'Спин-офф «Бэтмена»: Оз Коббпот борется за контроль над преступным миром Готэма.',
    poster: 'https://image.tmdb.org/t/p/w500/mOduovmebMkWdX4XjM4JVQkdvAt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dIOkBONJxXRdSvMZ4f3iAp9bUaJ.jpg',
    duration: 55, age: 18, trailerUrl: 'https://www.youtube.com/embed/9XINtHPV7Ak',
    type: 'series', seasons: 1, status: 'ended',
  },
  {
    id: 115, title: 'Сёгун', year: 2024,
    genres: ['Драма', 'Боевик'], rating: 8.7,
    description: 'Английский мореплаватель прибывает в феодальную Японию и оказывается втянут в борьбу за власть.',
    poster: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1YAPB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9JWJT4oCJBbFCfyUHy6XiissFnc.jpg',
    duration: 60, age: 16, trailerUrl: 'https://www.youtube.com/embed/Ugh_4aNAbSI',
    type: 'series', seasons: 1, status: 'ongoing', nextEpisode: '2025-03-28',
  },
]

// ── Аниме ────────────────────────────────────────────────────
export const anime = [
  {
    id: 201, title: 'Атака титанов', year: 2013,
    genres: ['Боевик', 'Драма', 'Фэнтези', 'Аниме'], rating: 9.0,
    description: 'Человечество укрылось за стенами от гигантских людоедов. Эрен Йегер клянётся уничтожить их всех.',
    poster: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/mj3f6HUYCFfvEFBi8m1WCGiqRm9.jpg',
    duration: 24, age: 16, trailerUrl: 'https://www.youtube.com/embed/LHtdKWJdif4',
    type: 'anime', seasons: 4, status: 'ended',
  },
  {
    id: 202, title: 'Тетрадь смерти', year: 2006,
    genres: ['Триллер', 'Драма', 'Аниме'], rating: 9.0,
    description: 'Студент находит тетрадь, дающую власть убивать, и начинает «очищать» мир от преступников.',
    poster: 'https://image.tmdb.org/t/p/w500/iigTMHVNSJYGEwBvabMOYFkgBhE.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9tMOGsq7l5Y63h6j2smPyBsVXgC.jpg',
    duration: 23, age: 16, trailerUrl: 'https://www.youtube.com/embed/NlJZ-YgAt-c',
    type: 'anime', seasons: 1, status: 'ended',
  },
  {
    id: 203, title: 'Унесённые призраками', year: 2001,
    genres: ['Фэнтези', 'Драма', 'Аниме'], rating: 8.6,
    description: 'Десятилетняя девочка попадает в мир духов и должна найти способ спасти своих родителей.',
    poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg',
    duration: 125, age: 6, trailerUrl: 'https://www.youtube.com/embed/ByXuk9QqQkk',
    type: 'anime', seasons: 1, status: 'ended',
  },
  {
    id: 204, title: 'Клинок, рассекающий демонов', year: 2019,
    genres: ['Боевик', 'Фэнтези', 'Аниме'], rating: 8.7,
    description: 'Тандзиро Камадо вступает в корпус охотников на демонов, чтобы отомстить за семью и вернуть сестру.',
    poster: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xGGGMXdGWfgs6QS5xlCPFrDmtpi.jpg',
    duration: 24, age: 14, trailerUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4',
    type: 'anime', seasons: 4, status: 'ongoing', nextEpisode: '2025-04-06',
  },
  {
    id: 205, title: 'Наруто', year: 2002,
    genres: ['Боевик', 'Фэнтези', 'Аниме'], rating: 8.4,
    description: 'Юный ниндзя с мечтой стать Хокаге проходит через испытания и открывает силу дружбы.',
    poster: 'https://image.tmdb.org/t/p/w500/xppeysfvDKVx775MFuH8Z9BlpMk.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/vDJ2BpbHEivk9YKFVEsOGkRFuqF.jpg',
    duration: 23, age: 12, trailerUrl: 'https://www.youtube.com/embed/QczyDKFnDqM',
    type: 'anime', seasons: 5, status: 'ended',
  },
  {
    id: 206, title: 'Ван Пис', year: 1999,
    genres: ['Боевик', 'Фэнтези', 'Аниме'], rating: 8.9,
    description: 'Монки Д. Луффи и его пиратская команда отправляются на поиски легендарного сокровища — Ван Писа.',
    poster: 'https://image.tmdb.org/t/p/w500/fcXdJlbSqiWkvHSD6hZaEELFPIa.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg',
    duration: 24, age: 12, trailerUrl: 'https://www.youtube.com/embed/MCbmFGPGVL0',
    type: 'anime', seasons: 20, status: 'ongoing', nextEpisode: '2025-03-09',
  },
  {
    id: 207, title: 'Стальной алхимик: Братство', year: 2009,
    genres: ['Боевик', 'Фэнтези', 'Драма', 'Аниме'], rating: 9.1,
    description: 'Братья Элрик ищут Философский камень, чтобы восстановить свои тела после провала запрещённого ритуала.',
    poster: 'https://image.tmdb.org/t/p/w500/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/aBqMDPBUqFmRRVPgQrGfVRXnxwQ.jpg',
    duration: 24, age: 14, trailerUrl: 'https://www.youtube.com/embed/--IcmZkvL0Q',
    type: 'anime', seasons: 1, status: 'ended',
  },
  {
    id: 208, title: 'Ковбой Бибоп', year: 1998,
    genres: ['Боевик', 'Фантастика', 'Аниме'], rating: 8.9,
    description: 'Охотники за головами путешествуют по космосу на корабле Bebop в поисках преступников и себя.',
    poster: 'https://image.tmdb.org/t/p/w500/oH6WTmBn0YbsG3dqfxjPnK9Szmm.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
    duration: 24, age: 16, trailerUrl: 'https://www.youtube.com/embed/YiRqD8TgEjA',
    type: 'anime', seasons: 1, status: 'ended',
  },
  {
    id: 209, title: 'Охотник x Охотник', year: 2011,
    genres: ['Боевик', 'Фэнтези', 'Аниме'], rating: 9.0,
    description: 'Маленький мальчик Гон мечтает стать охотником — элитным членом общества, способным выживать везде.',
    poster: 'https://image.tmdb.org/t/p/w500/1ZdST8gElRHaUePDZhbLW7QLZBY.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/vDJ2BpbHEivk9YKFVEsOGkRFuqF.jpg',
    duration: 23, age: 12, trailerUrl: 'https://www.youtube.com/embed/D2gACimHjyg',
    type: 'anime', seasons: 1, status: 'ended',
  },
  {
    id: 210, title: 'Наруто: Шиппуден', year: 2007,
    genres: ['Боевик', 'Фэнтези', 'Аниме'], rating: 8.7,
    description: 'Продолжение истории Наруто: двухлетняя тренировка завершена, впереди — настоящие битвы.',
    poster: 'https://image.tmdb.org/t/p/w500/sSCMFIkoP1m3MsLxdkUFDkzfLBH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/zFbjgBMXjPqzeTLAizpOXVGcnpr.jpg',
    duration: 23, age: 12, trailerUrl: 'https://www.youtube.com/embed/GHkZcXYXYFY',
    type: 'anime', seasons: 21, status: 'ended',
  },
  {
    id: 211, title: 'Токийский гуль', year: 2014,
    genres: ['Ужасы', 'Боевик', 'Аниме'], rating: 7.9,
    description: 'Студент превращается в гуля — существо, питающееся людьми, и пытается остаться человеком.',
    poster: 'https://image.tmdb.org/t/p/w500/7GDHFGk8gHBPKUuFP9rGMH9LRBq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rqAaFXS9GFiSeFiRUGMKlm7CSDB.jpg',
    duration: 24, age: 18, trailerUrl: 'https://www.youtube.com/embed/vGuQeQsoRgU',
    type: 'anime', seasons: 4, status: 'ended',
  },
  {
    id: 212, title: 'Моя геройская академия', year: 2016,
    genres: ['Боевик', 'Фэнтези', 'Аниме'], rating: 8.4,
    description: 'Мир, где почти все люди имеют суперспособности. Мальчик без них мечтает стать величайшим героем.',
    poster: 'https://image.tmdb.org/t/p/w500/iv5K9FVnmXBNHBLQNFalBWpAMJX.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xGGGMXdGWfgs6QS5xlCPFrDmtpi.jpg',
    duration: 24, age: 12, trailerUrl: 'https://www.youtube.com/embed/EP3O4yB9GaI',
    type: 'anime', seasons: 7, status: 'ongoing', nextEpisode: '2025-04-05',
  },
  {
    id: 213, title: 'Джуджуцу Кайсен', year: 2020,
    genres: ['Боевик', 'Ужасы', 'Аниме'], rating: 8.6,
    description: 'Старшеклассник проглатывает проклятый палец, чтобы спасти друзей, и становится носителем демона.',
    poster: 'https://image.tmdb.org/t/p/w500/oMBGbQFxAEk0QXrMhxQT8Fz9fPS.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xGGGMXdGWfgs6QS5xlCPFrDmtpi.jpg',
    duration: 23, age: 16, trailerUrl: 'https://www.youtube.com/embed/pkKu9hLT-t8',
    type: 'anime', seasons: 2, status: 'ongoing', nextEpisode: '2025-07-01',
  },
]

export const allContent = [...movies, ...series, ...anime]

// ── Обёртки с fallback на API (если бекенд запущен) ──────────
const API = 'http://localhost:5000/api'

const tryFetch = async (url) => {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null  // бекенд не запущен — используем статические данные
  }
}

export const fetchMovies = async () => {
  const data = await tryFetch(`${API}/movies`)
  if (data && data.length > 0) return data.filter(m => m.type === 'movie')
  return movies
}

export const fetchSeries = async () => {
  const data = await tryFetch(`${API}/movies`)
  if (data && data.length > 0) return data.filter(m => m.type === 'series')
  return series
}

export const fetchAnime = async () => {
  const data = await tryFetch(`${API}/movies`)
  if (data && data.length > 0) return data.filter(m => m.type === 'anime')
  return anime
}

export const fetchAll = async () => {
  const data = await tryFetch(`${API}/movies`)
  if (data && data.length > 0) return data
  return allContent
}

export const fetchMovieById = async (id) => {
  const data = await tryFetch(`${API}/movies/${id}`)
  if (data && data.id) return data
  const item = allContent.find(m => m.id === Number(id))
  return item || null
}
