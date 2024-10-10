import { validate } from "jsonschema"

export default function(toTest: object) {
    return validate(toTest, {
        "type": "object",
        "properties": {
            "title": {
                "type": "string"
            },
            "tagline": {
                "type": "string"
            },
            "overview": {
                "type": "string"
            },
            "genres": {
                "type": "array"
            },
            "release_date": {
                "type": "string"
            },
            "runtime": {
                "type": "integer"
            }
        },
        "required": [
            "title",
            "tagline",
            "overview",
            "genres",
            "release_date",
            "runtime"
        ]
    });
}
