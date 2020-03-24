# COVID-19 app example API

Simple backend, powered by Laravel and Nova, that provides an API with news feeds, hospitals and pharmacies (currently only for France).

## Table of contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Running locally](#running-locally)


## About the project

Simple backend, powered by Laravel and Nova, that provides an example API with news feeds, hospitals and pharmacies, for the [COVID-19 app](https://github.com/bluesquare-io/covid-19-app).   

Hospitals and pharmacies data for France were retrieved from official datasets:   
* https://www.data.gouv.fr/fr/datasets/finess-extraction-du-fichier-des-etablissements   
* https://www.data.gouv.fr/fr/datasets/les-etablissements-hospitaliers-franciliens-idf

### Built with

* [Laravel](https://laravel.com/)
* [Nova](https://nova.laravel.com/)


## Getting started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo   
```
git clone https://github.com/bluesquare-io/covid-19-server.git
```
2. Install [Nova](https://nova.laravel.com/)
3. Install NPM packages   
```
yarn install 
```
4. Install composer dependencies   
```
composer install
```

### Running locally 
 
1. Launch Laravel server   
```
php artisan serve
```
2. Launch package manager   
```
yarn watch 
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. 
Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
