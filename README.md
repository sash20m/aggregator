# Companies Aggregator App

You need to create an application that allows to user search companies and show companies information. 

## Technologies:
1. ESLint + Prettier
2. NextJS
3. React
4. React Hooks
5. Typescript
6. Axios

### Business logic:
1. Searches companies using [https://app.informer.md/api/public/search?page=1&per_page=5&company_name=**INPUT-VALUE**](https://app.informer.md/api/public/search?company_name=enterprise&page=1&per_page=5)
2. Shows all found companies [https://app.informer.md/api/public/search?page=**CURRENT_PAGE**&company_name=**INPUT_VALUE**](https://app.informer.md/api/public/search?per_page=25&page=1)
3. Shows company profile [https://app.informer.md/api/public/company?slug=**COMPANY_SLUG**](https://app.informer.md/api/public/company?slug=oilauto-lux)

