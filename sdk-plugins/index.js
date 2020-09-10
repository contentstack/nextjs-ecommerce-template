const Contentstack = require("contentstack");
// import getConfig from 'next/config'
// const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// const Stack = Contentstack.Stack({
//   api_key: serverRuntimeConfig.api_key? serverRuntimeConfig.api_key:publicRuntimeConfig.api_key,
//   delivery_token: serverRuntimeConfig.delivery_token? serverRuntimeConfig.delivery_token:publicRuntimeConfig.delivery_token,
//   environment: serverRuntimeConfig.environment? serverRuntimeConfig.environment:publicRuntimeConfig.environment,
//   region: serverRuntimeConfig.region ? serverRuntimeConfig.region : publicRuntimeConfig.region? publicRuntimeConfig.region:"us",
// });
const Stack = Contentstack.Stack({
  api_key: process.env.api_key,
  delivery_token: process.env.delivery_token,
  environment: process.env.environment,
  region: process.env.region
});

export default {
  getEntryWithRef(ctUid, ref, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeReference(ref)
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
  getEntryWithoutRef(ctUid, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
  getEntrySpecific(ctUid, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
			.language(locale)
			.toJSON()
			// .includeCount()
			.find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
  getEntrySpecificWithRef(ctUid, entryId, ref, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .toJSON()
        .or(
          Stack.ContentType(ctUid).Query().where("uid", entryId),
          Stack.ContentType(ctUid).Query().where("url", `/product/${entryId}`)
        )
        .includeReference(ref)
        .find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
  getEntryWithQuery(ctUid, type, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .toJSON()
        .limit(9)
        .query({ categories: { $in_query: { url: `/category/${type}` } } })
        .only(["title", "url", "featured_image", "product_link", "price"])
        .includeCount()
        .find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
};
