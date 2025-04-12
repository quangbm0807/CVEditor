// constants/templates.js - Fixed
import { Template1 } from "../cv-templates/Template1";
import { Template2 } from "../cv-templates/Template2";
import { Template3 } from "../cv-templates/Template3";

// Default thumbnail images in case the server doesn't have them
const DEFAULT_THUMBNAILS = {
    template1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+QmFzaWMgVGVtcGxhdGU8L3RleHQ+PC9zdmc+',
    template2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+UHJvZmVzc2lvbmFsPC90ZXh0Pjwvc3ZnPg==',
    template3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+TW9kZXJuPC90ZXh0Pjwvc3ZnPg=='
};

export const CV_TEMPLATES = {
    template1: {
        id: 'template1',
        name: 'Basic Template',
        component: Template1,
        thumbnail: DEFAULT_THUMBNAILS.template1
    },
    template2: {
        id: 'template2',
        name: 'Professional',
        component: Template2,
        thumbnail: DEFAULT_THUMBNAILS.template2
    },
    template3: {
        id: 'template3',
        name: 'Modern',
        component: Template3,
        thumbnail: DEFAULT_THUMBNAILS.template3
    }
};