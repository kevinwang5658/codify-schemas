import schema from './validate-response-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats';
import {ValidateResponseData} from "../types/index.js";

const ajv = new Ajv2020.default({
  strict: true,
})
addFormats.default(ajv);

describe('Plan response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("validates correct config", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      resourceValidations: [
        {
          resourceType: 'abc',
          schemaValidationErrors: [],
          isValid: true
        },
        {
          resourceType: 'abc',
          resourceName: 'def',
          schemaValidationErrors: [
            {
              schemaPath: '/0',
              instancePath: '/0'
            }
          ],
          customValidationErrorMessage: "this is also an error message",
          isValid: false,
        },
      ]
    } as ValidateResponseData)).to.be.true;
  })

  it ("validates incorrect config", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      resourceValidations: [
        { resourceName: 'abc', isValid: true },
      ]
    } as ValidateResponseData)).to.be.false;
  });

})
