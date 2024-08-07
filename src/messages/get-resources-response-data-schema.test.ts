import schema from './get-resources-response-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv.default({
  strict: true,
})
ajv.addSchema(resourceSchema);

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("requires a type field to be specified", () => {
    const validate = ajv.compile(schema);
    expect(validate({ resources: [
        {
          type: "typeA",
          dependencies: [
            "typeB"
          ]
        },
        {
          type: "typeB"
        }
    ]})).to.be.true;

    expect(validate({
      resources: [
        {
          type: "typeA",
          dependencies: [
            "typeB"
          ]
        },
        {}
      ]
    })).to.be.false;
  })

})
