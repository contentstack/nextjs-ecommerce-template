const Contentstack = require("contentstack");

const Stack =process.env && Contentstack.Stack({
  api_key: process.env.api_key,
  delivery_token: process.env.delivery_token,
  environment: process.env.environment,
  region: process.env.region ? process.env.region : "us",
});
if (process.env.custom_host) {
  Stack.setHost(process.env.custom_host)
}
export default {
  getEntryWithRef(ctUid, ref, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .includeReference(ref)
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
  getEntrySpecificWithoutRef(ctUid,entryURL, locale) { 
  return new Promise((resolve, reject) => {
    let blogQuery = Stack.ContentType(ctUid)
      .Query()
      .language(locale)
      .includeOwner()
      .toJSON()
      .or(
        Stack.ContentType(ctUid).Query().where("url", entryURL)
      )
      .find()
      .then(
      (result) => {
        resolve(result[0]);
      },
      (error) => {
        reject(error);
      }
    );
  });
},
  getEntrySpecificWithRef(ctUid, entryURL, ref, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .toJSON()
        .or(
        Stack.ContentType(ctUid).Query().where("url", entryURL)
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
