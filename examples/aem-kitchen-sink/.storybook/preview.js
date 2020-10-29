import { addParameters, addDecorator } from '@storybook/client-api';
import { withA11y } from '@storybook/addon-a11y';
import { aemMetadata, GenericModel } from '@storybook/aem';
import { components as CoreComponents, models as CoreModels } from '@storybook/aem-core-components';

addDecorator(withA11y);
addDecorator(aemMetadata({
    components: [
        require('../components/accordion/.content.xml'),
        require('../components/list/.content.xml'),
        require('../components/text/.content.xml'),
        require('../components/aemtext/.content.xml'),
        ...CoreComponents,
        // ...require('./dependencies').components,
    ],
    models: {
        'Accordion': GenericModel,
        'Text': GenericModel,
        'List': GenericModel,
        'person': require('../models/person'),
        ...CoreModels
    },
    // todo: the includes could be automatically detected during compilation using the script resolver
    // includes: {
    // 'components/accordion/item.htl': require('../components/accordion/item.htl'),
    // 'components/include/item.htl': require('../components/include/item.htl'),
    // }
}));

addParameters({
    a11y: {
        config: {},
        options: {
            checks: { 'color-contrast': { options: { noScroll: true } } },
            restoreScroll: true,
        },
    },
    options: {
        showRoots: true,
    },
    docs: {
        iframeHeight: '200px',
    },
});