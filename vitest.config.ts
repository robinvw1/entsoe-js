import path from 'path';

const config = {
    test: {
        setupFiles: ['./test/setup.ts']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
};

export default config;
