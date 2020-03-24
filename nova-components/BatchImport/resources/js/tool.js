Nova.booting((Vue, router, store) => {
    router.addRoutes([
        {
            name: 'BatchImport',
            path: '/batch-import',
            component: require('./components/Tool'),
        },
        {
            name: 'batch-import-preview',
            path: '/batch-import/preview/:file',
            component: require('./components/Preview'),
            props: route => {
                return {
                    file: route.params.file,
                }
            },
        },
        {
            name: 'batch-import-review',
            path: '/batch-import/review/:file',
            component: require('./components/Review'),
            props: route => {
                return {
                    file: route.params.file,
                }
            },
        },
    ])
})
