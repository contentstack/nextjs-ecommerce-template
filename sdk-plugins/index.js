const Contentstack = require("contentstack");

export default {
  getEntryWithRef(ctUid, ref, locale) {
    return new Promise((resolve, reject) => {
      const Stack = Contentstack.Stack({
        api_key: process.env.api_key,
        delivery_token: process.env.delivery_token,
        environment: process.env.environment,
      });
      Stack.ContentType(ctUid)
        .Query()
        .language(locale || 'en-us')
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
      const Stack = Contentstack.Stack({
        api_key: process.env.api_key,
        delivery_token: process.env.delivery_token,
        environment: process.env.environment,
      });
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
  getEntrySpecific(ctUid, entryId, locale) {
    return new Promise((resolve, reject) => {
      const Stack = Contentstack.Stack({
        api_key: process.env.api_key,
        delivery_token: process.env.delivery_token,
        environment: process.env.environment,
      });
      Stack.ContentType(ctUid)
        .Entry(entryId)
        .language(locale)
        .fetch()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },  getEntrySpecificWithRef(ctUid, entryId,ref, locale) {
    return new Promise((resolve, reject) => {
      const Stack = Contentstack.Stack({
        api_key: process.env.api_key,
        delivery_token: process.env.delivery_token,
        environment: process.env.environment,
      });
      Stack.ContentType(ctUid)
        .Entry(entryId)
        .language(locale)
        .includeReference(ref)
        .fetch()
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
    const Stack = Contentstack.Stack({
      api_key: process.env.api_key,
      delivery_token: process.env.delivery_token,
      environment: process.env.environment,
    });
    Stack.ContentType(ctUid)
      .Query()
      .language(locale)
      .toJSON()
      .limit(9)
      .query({ categories: { $in_query: { url: `/category/${type}` } } })
      .only(["title", "url", "featured_image", "product_link","price"]) 
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
    })
  },
};
