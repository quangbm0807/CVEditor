// constants/templates.js
import Template1 from "../cv-templates/Template1";
import Template2 from "../cv-templates/Template2";
import Template3 from "../cv-templates/Template3";

export const CV_TEMPLATES = {
    template1: {
        id: 'template1',
        name: 'Basic Template',
        component: Template1,
        thumbnail: '/templates/template1.png'
    },
    template2: {
        id: 'template2',
        name: 'Professional',
        component: Template2,
        thumbnail: '/templates/template2.png'
    },
    template3: {
        id: 'template3',
        name: 'Modern',
        component: Template3,
        thumbnail: '/templates/template3.png'
    }
};