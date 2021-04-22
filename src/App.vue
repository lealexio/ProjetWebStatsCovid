<template>

    <main role="main" id="app">

        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-secondary">
            <a class="navbar-brand">Synthèse de la pandémie COVID-19, France</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>

        <!-- View, the data is passed as well as the state of the loading of these-->
        <div v-if="!errored" class="container mb-5">
            <SyntheseFR :statistics="statistics" :loading="loading"/>
            <SyntheseRegions :statistics="statistics" :loading="loading"/>
            <SyntheseDepartements :statistics="statistics" :loading="loading"/>
            <DepartementChart :departements="departements" :loading="loading"/>
        </div>

        <!-- Error view -->
        <div v-else class="container mb-5">
            <div class="card text-center mt-5">
                <div class="card-body">
                    <img class="" src="./assets/anxiety.svg" style="width: 18rem;" alt="Card image cap">
                </div>
                <div class="card-footer">
                    <p class="text-muted">{{errorMessage}}</p>
                    <button class="btn btn-dark" onClick="window.location.reload();">Refresh Page</button>
                </div>
            </div>
        </div>


    </main>
</template>

<script>
    import SyntheseFR from "./components/SyntheseFR.vue";
    import SyntheseRegions from "./components/SyntheseRegions.vue";
    import SyntheseDepartements from "./components/SyntheseDepartements.vue";
    import DepartementChart from "./components/DepartementChart";

    export default {
        name: "app",
        components: {
            DepartementChart,
            SyntheseFR,
            SyntheseRegions,
            SyntheseDepartements,
        },
        data() {
            return {
                statistics: [],
                departements: [],
                errored: false,
                loading: true,
                errorMessage: "We're sorry, we're not able to retrieve this information at the moment, please try again later!",
            };
        },
        mounted() {
            //URL of used API
            const url = `https://coronavirusapi-france.now.sh/AllLiveData`;

            //Load daily data
            axios
                .get(url)
                .then(response => {
                    this.statistics = response.data.allLiveFranceData;

                    //Put in an array all departements for Chart
                    for (let i = 0; i < this.statistics.length; i++) {
                        if(this.statistics[i].code.startsWith("DEP")){
                            this.departements.push(this.statistics[i].nom)
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.loading = false;
                    this.error = true;
                })
                .finally(() => (this.loading = false));
        },
    };


</script>
