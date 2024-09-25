Для проекта используется fullstack движок [Meteor](https://www.meteor.com)

Установите Meteor (если не установлен)

`npx meteor`

Перейдите в папку проекта и проинициализируйте его:

`meteor lint`

Установите зависимости через npm или pnpm с параметром --force для избежания ошибок:

`npm i --force` or `pnpm i --force`

Запуск в dev-режиме:

`npm start` or `pnpm start`

### Users API
All APIs require authorization by login and password (basic-auth)

<details>
<summary><code>POST</code> <code><b>/users/add</b></code> <code>(add users)</code></summary>

##### Body object (JSON)

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | username      |  true | string   | N/A  |
> | password      |  true | string   | The password must be between 6 and 18 characters long, contain at least one letter, one number, one special character |
> | name      |  false | string   | N/A  |
> | email      |  false | string   | Must match [emailRegex](https://emailregex.com) |
> | role      |  false | string   | Requires admin rights  |

</details>


<details>
<summary><code>GET</code> <code><b>/users/:userId</b></code> <code>(get user by id)</code></summary>

##### Parametres URL

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | userId      |  true | string   | N/A  |

</details>


<details>
<summary><code>GET</code> <code><b>/users</b></code> <code>(get users)</code></summary>

##### Parametres

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | sort_by      |  false | string   | any user field |
> | order_by      |  false | string   | asc or desc  |
> | page     |  false | number   |  |
> | limit      |  false | number   |   |
> | _id     |  false | string   | N/A  |
> | username      |  false | string   | N/A  |
> | name      |  false | string   | N/A  |
> | email     |  false | string   | Must match [emailRegex](https://emailregex.com) |
> | role      |  false | string   | Requires admin rights  |

</details>


<details>
<summary><code>PUT</code> <code><b>/users/update</b></code> <code>(update user)</code></summary>

##### Body object (JSON)

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | username      |  true | string   | N/A  |
> | password      |  true | string   | The password must be between 6 and 18 characters long, contain at least one letter, one number, one special character |
> | name      |  false | string   | N/A  |
> | email      |  false | string   | Must match emailRegex [emailRegex](https://emailregex.com) |
> | role      |  false | string   | Requires admin rights  |

</details>


<details>
<summary><code>DELETE</code> <code><b>/users/remove/:userId</b></code> <code>(add users)</code></summary>

##### Parametres URL

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | userId      |  true | string   | Requires admin rights  |

</details>

### Tasks API
All APIs require authorization by login and password (basic-auth)

<details>
<summary><code>POST</code> <code><b>/tasks/add</b></code> <code>(add tasks)</code></summary>

##### Body object (JSON)

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | taskname      |  true | string   | N/A  |
> | description     |  false | string   |  |

</details>


<details>
<summary><code>GET</code> <code><b>/tasks</b></code> <code>(get tasks)</code></summary>

##### Parametres

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | sort_by      |  false | string   | any task field |
> | order_by      |  false | string   | asc or desc  |
> | page     |  false | number   |  |
> | limit      |  false | number   |   |
> | _id     |  false | string   | N/A  |
> | name      |  false | string   | N/A  |
> | description     |  false | string   |  |

</details>


<details>
<summary><code>PUT</code> <code><b>/tasks/update</b></code> <code>(update task)</code></summary>

##### Body object (JSON)

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | name      |  false | string   | N/A  |
> | description     |  false | string   |  |

</details>


<details>
<summary><code>DELETE</code> <code><b>/tasks/remove/:taskId</b></code> <code>(add tasks)</code></summary>

##### Parametres URL

> | name      |  required     | content-type               | description                                                           |
> |-----------|-----------|-------------------------|----------------------------------------|
> | taskId      |  true | string   |   |

</details>


## Требования к задаче:
- [x] Использовать Node.js и TypeScript.
- [x] Обработать основные ошибки.
- Написать юнит тесты, используя jest/mocha/chai для основного функционала приложений.
- [x] Оформить код согласно стандартам (ESLint/Prettier).
- [x] Для выполнения задач, если это нужно, вы можете использовать любые базы данных: postgresql, mongo, redis.
- Нужно использовать pnpm, а не yarn и npm.
- Если необходимо, нужно настроить Docker и Docker-Compose.
- [x] Код по задачи должен быть в отдельном репозитории на github.

Задача: Нужно реализовать небольшой REST API для работы с пользователями и их задачами. Можно использовать любой фреймворк.

### API должно уметь выполнять следующие операции:

#### Для пользователей:

1. [x] Создание пользователя
2. [x] Получение списка всех пользователей
3. [x] Получение информации о пользователе по ID
4. [x] Обновление информации о пользователе
5. [x] Удаление пользователя

#### Для задач:

1. [x] Создание задачи
2. [x] Получение списка всех задач пользователя
3. [x] Обновление задачи
4. [x] Удаление задачи

### Пожелания:

1. [x] Для методов получения списка пользователей и задач нужно добавить фильтрацию, сортировку и пагинацию.
2. [x] Для методов задач нужна аутентификация пользователей.
3. Нужно сделать централизованную обработку ошибок и логирование запросов.
4. К API нужно сделать документацию.
5. [x] Проверять email и пароль с помощью регулярных выражений.
6. [x] Сделать несколько ролей пользователей. Только админ может удалять пользователей.
7. Возможность загрузки аватара пользователя и сохранение его на сервере
