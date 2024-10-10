import { validate } from "jsonschema"

export default function(toTest: object) {
    return validate(toTest, {
        "type": "object",
        "properties": {
            "imdb_id": {
                "type": "string"
            },
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
            "imdb_id",
            "title",
            "tagline",
            "overview",
            "genres",
            "release_date",
            "runtime"
        ]
    });
}
