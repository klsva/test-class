## Тестовое задание на разработку отчета по занятиям

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) 	![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Описание тестового задания
Требуется создать веб-сервер на базе KoaJS или ExpressJS, который будет работать с данными по занятиям. Данные хранятся в СУБД PostgreSQL, дамп тестовых данных прилагается к тестовому заданию. Предлагается сделать 2 задачи. Первая - запрос данных, вторая - манипуляция с данными. Исполнителю предлагается сделать задачу, выбирая адекватные инструменты и общепринятые способы организации кода и API-интерфейсов, учитывая указанные в задании требования. Необходимо написать тесты для созданных методов. При разработке учитывать, что данных может быть очень много (миллионы занятий).

### Общие требования 
* Язык: JavaScript 
* Веб-сервер: KoaJS или ExpressJS 
* Версия NodeJS: 12 или выше. 
* Работа с СУБД через knex или pg (sql-запросы) 
* Используемый Content-Type при работе - application/json 
* Код должен быть выложен на GitHub или GitLab, система контроля версий - git.

### Что я использовала
* Версия NodeJs: 18
* ExpressJS
* Работа с СУБД через  pg
* Тесты Postman и Jest
* Linter

### Запуск приложения

```
$ git clone https://github.com/klsva/test-class.git
$ cd test-class
```

В папке создать .env файл
В файле прописать переменные порт для запуска приложения и подключение к базе данных
PORT=5000
DB_HOST
DB_USER
DB_NAME
DB_PASSWORD
DB_PORT

```
$ npm install
$ npm run dev
```
Приложение запустится на указанном порту http://localhost:5000

### Scripts
npm run dev - запуск приложения в режиме dev
npm run test - запуск тестов

### Deploy link


### TODO:
* Можно доделать тесты и перенести их в одно место. Сейчас часть тестов в Postman, часть в приложении
* Рефакторинг кода
* Подумать над вариантами оптимизации запросов к БД
* Настроить jest.setup 
