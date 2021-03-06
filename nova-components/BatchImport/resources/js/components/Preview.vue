<template>
    <div>
        <heading class="mb-6">Import CSV</heading>
        <card class="flex flex-col" style="min-height: 300px" v-if="loading">
            <div class="p-8">
                <h2 class="pb-4">Preview</h2>
                <p class="pb-4">En cours de traitement...</p>
            </div>
        </card>
        <card class="flex flex-col" style="min-height: 300px" v-else>
            <div class="p-8">
                <h2 class="pb-4">Preview</h2>
                <p class="pb-4">
                    <b>{{ headings.length }}</b> colonne(s) et <b>{{ total_rows }}</b>
                    ligne(s) ont été découvertes dans le fichier importé.
                </p>
                <p class="pb-4">
                    Sélectionnez une ressource dans laquelle les importer et faites correspondre les en-têtes du CSV aux champs appropriés de la ressource.
                </p>

                <h2 class="py-4">Ressource</h2>
                <p class="pb-4">Sélectionnez une ressource dans laquelle importer vos données :</p>
                <div>
                    <select name="resource" class="block form-control form-select" v-model="resource">
                        <option value="">- Sélectionnez une ressource -</option>
                        <option v-for="(label, index) in resources" :value="index">{{ label }}</option>
                    </select>
                </div>
            </div>

            <table class="table w-full">
                <thead>
                    <tr>
                        <th v-for="heading in headings">{{ heading }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="heading in headings" class="text-center">
                            <select class="w-full form-control form-select" v-model="mappings[heading]">
                                <option value="">- Ignorer cette colonne -</option>
                                <option v-for="field in fields[resource]" :value="field.attribute">{{ field.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-for="row in rows">
                        <td v-for="col in row">{{ col }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="bg-30 flex px-8 py-4">
                <button class="btn btn-default btn-primary" @click="runImport" :disabled="disabledImport" id="run-import">Importer &rightarrow; </button>
            </div>
        </card>
    </div>
</template>

<script>
export default {
    mounted() {
        const self = this;
        self.loading = true;

        Nova.request()
            .get('/nova/batch-import/preview/' + this.file)
            .then(function (response) {
                self.headings = response.data.headings;
                self.rows = response.data.sample;
                self.resources = response.data.resources;
                self.total_rows = response.data.total_rows;
                self.fields = response.data.fields;

                self.headings.forEach(function (heading) {
                    self.$set(self.mappings, heading, "");
                });

                self.loading = false;
            });
    },
    data() {
        return {
            loading: false,
            headings: [],
            rows: [],
            resources: [],
            fields: [],
            resource: '',
            mappings: {},
        };
    },
    props: [
        'file'
    ],
    watch: {
        resource : function (resource) {
            const self = this;

            // Reset all of the headings to blanks
            this.headings.forEach(function (heading) {
                self.$set(self.mappings, heading, "");
            });

            if (resource === "") {
                return;
            }

            // For each field of the resource, try to find a matching heading and pre-assign
            this.fields[resource].forEach(function (field_config) {
                let field = field_config.attribute,
                    heading_index = self.headings.indexOf(field);

                if (heading_index < 0) {
                    return;
                }

                let heading = self.headings[heading_index];

                if (heading === field) {
                    self.$set(self.mappings, heading, field);
                }
            });
        }
    },
    methods: {
        runImport: function () {
            const self = this;

            if (! this.hasValidConfiguration()) {
                return;
            }

            const button = document.getElementById('run-import');
            button.innerHTML = 'En cours d\'import...';
            button.setAttribute("disabled", "disabled");

            let data = {
                resource: this.resource,
                mappings: this.mappings
            };

            Nova.request()
                .post(this.url('import/' + this.file), data)
                .then((response) => {
                    if (response.data.result === 'success') {
                        self.$toasted.show('Toutes les données ont été importées !', {type: "success"});
                        this.$router.push({name: 'batch-import-review', params: {file: self.file, resource: self.resource}});
                    } else {
                        button.innerHTML = 'Importer &rightarrow;';
                        button.removeAttribute("disabled");
                        self.$toasted.show('Des problèmes sont survenus lors de l\'importation de certaines de vos données', {type: "error"});
                    }
                });

        },
        hasValidConfiguration: function () {
            const mappedColumns = [],
                mappings = this.mappings;

            Object.keys(mappings).forEach(function (key) {
                if (mappings[key] !== "") {
                    mappedColumns.push(key);
                }
            });

            return this.resource !== '' && mappedColumns.length > 0;
        },
        url: function (path) {
            return '/nova/batch-import/' + path;
        }
    },
    computed: {
        disabledImport: function () {
            return ! this.hasValidConfiguration();
        },
    }
}
</script>
