<template>
    <div class="card mt-5" v-if="departements && !loading && show">
        <div v-on:click="showData()" class="card-header">
            <h2 class="float-left">Synthèse graphique par départements</h2><h2 class="float-right">⬇</h2>
        </div>
        <form class="card-body">
            <div class="form-group">
                <select v-model="departementChoisi" @change="onChange($event)" class="form-control" id="exampleFormControlSelect1">
                    <option v-for="d in departements" :value="d">{{ d }}</option>
                </select>
            </div>
        </form>

        <RandomChart class="card-footer" v-if="!graphLoading && departementChoisi" :statistics="chartData"/>

        <div v-else-if="graphLoading && departementChoisi" class="card-footer">
            <div class="d-flex align-items-center">
                <strong>Chargement des données...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>
        <div v-else class="card-footer">
            <div class="d-flex align-items-center">
                <strong>Veuillez choisir un département</strong>
                <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>
    </div>
    <div class="card text-center mt-5" v-else-if="loading">
        <div class="card-header"><h2>Synthèse graphique par département</h2></div>
        <div class="card-body">
            <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
                <span class="sr-only"><strong>Loading...</strong></span>
            </div>
        </div>
        <div class="card-footer text-muted"><strong>Loading...</strong></div>
    </div>

    <div class="card text-center mt-5" v-else-if="!loading && !show">
        <div v-on:click="showData()" class="card-header"><h2 class="float-left">Synthèse graphique par départements</h2><h2 class="float-right">⬆</h2></div>
    </div>
</template>

<script>
    import RandomChart from "./RandomChart";
    export default {
        name: "DepartementChart",
        components: {
            RandomChart
        },
        props:{
            loading: true,
            departements: { type: Array},
        },
        data() {
            return {
                departementChoisi: '',
                show: false,
                chartData: { type: Array},
                graphLoading: true,
            }
        },
        methods: {
            showData: function () {
                this.show = !this.show;
            },
            onChange(event) {
                this.graphLoading=true;
                //Load daily data
                axios
                    .get(`https://coronavirusapi-france.vercel.app/AllDataByDepartement?Departement=`+event.target.value)
                    .then(response => {
                        this.chartData = response.data.allDataByDepartement;
                        console.log("New data :");
                        console.log(response.data.allDataByDepartement);
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => (this.graphLoading = false));
            }
        },
    };
</script>

<style scoped>

</style>
