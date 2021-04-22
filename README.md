# Synthèse de la pandémie COVID-19, France
Simple API fetch project with Vue.

Created with Vue-cli, Vue, Axios, Webpack & Node.

Deployed via CI/CD on Netlify.

You can view the app on netlify: [Synthèse de la pandémie COVID-19, France App](https://distracted-torvalds-135fe6.netlify.app/)


## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Introduction.

This project allows the rapid visualization of data from the day on the pandemic of Covid-19 in France.

It's possible to visualize the data of the day for France, for each region and each department.

In addition, a chart is generated for the selected department to visualize the evolution of the data since the beginning of the epidemic.

You can access the site from this URL on netlify : [Synthèse de la pandémie COVID-19, France App](https://distracted-torvalds-135fe6.netlify.app/)

And to the git : [Synthèse de la pandémie COVID-19, France GitHub](https://github.com/lealexio/ProjetWebStatsCovid)

## Components.

###App

The App.vue component load all the data of the day thanks to the [API](https://github.com/florianzemma/CoronavirusAPI-France) of [florianzemma](https://github.com/florianzemma) that allowing to exploit Coronavirus data of France updated every day.

The [axios](https://axios-http.com/) plugin is used to load data from the API url.
Data is stored in an Array named statistics.
After loading the data, the department names are stored so that they can be reused when loading the department graph.

All components are called from the APP component :
-DepartementChart
-SyntheseFR
-SyntheseRegions
-SyntheseDepartements

The loaded data are passed as arguments to them as well as the loading status.

###Data Component

Data components are SyntheseFR, SyntheseRegions, SyntheseDepartements.

They are similar because they use the same data source but don't show same data.
To filter the data, a condition is performed on the data code:
```
v-if="stats.code.substring(0,3) === 'DEP'"
```
if the code of the data begin with 'DEP' it's a department, 'REG' it's a region, 'FRA' it's France stats.

To hide the content of a Component, a boolean "hide" variable is used and switch when the user click on Component.
Then the component data is show when true, and hidden when false.

###Graphic Component

The graphic component is named DepartementChart.

