<template>
    <div>
        <heading class="mb-6">Import CSV</heading>

        <card class="flex flex-col items-center justify-center" style="min-height: 250px">
            <input type="file" name="file" ref="file" @change="handleFile">
            <div class="italic mt-2">Maximum 10 000 lignes par fichier</div>
            <button type="submit" class="btn btn-default btn-primary mt-4" @click="upload">Importer</button>
        </card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: '',
        };
    },
    methods: {
        handleFile: function (e) {
            this.file = this.$refs.file.files[0];
        },
        upload: function (e) {
            let formData = new FormData();
            const self = this;
            formData.append('file', this.file);

            Nova.request()
                .post('/nova/batch-import/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(response){
                    self.$router.push({name: 'batch-import-preview', params: {file: response.data.file}})
                })
                .catch(function(e){
                    self.$toasted.show(e.response.data.message, {type: "error"});
                });
        }
    }
}
</script>
