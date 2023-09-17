import * as yup from 'yup';

const propertySchema = yup.object().shape({
  id: yup.string().required(),
  listing_type: yup.string().oneOf(['buy', 'rent']).required(),
  price: yup.number().required(),
  currency: yup.string().required(),
  short_description: yup.string(),
  long_description: yup.string(),
  address: yup.string().required(),
  location: yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  }),
  property_type: yup.string().required(),
  image_urls: yup.array().of(yup.string()).required(),
  agent: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
  }),
  beds: yup.string().required(),
  sqft: yup.number().required(),
});

export default propertySchema;
