import { CHANGE_CATEGORY_FILTER } from 'Actions';

const INITIAL_STATE = { showAll: true, showPharma: false,
												showHerbals: false, showConsumer: false,
											 	showOTC: false };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case CHANGE_CATEGORY_FILTER:

			switch (action.payload) {

        case 'All':
          return { showAll: true, showPharma: false, showHerbals: false, showConsumer: false, showOTC: false };

        case 'Pharmaceuticals':
          return { showAll: false, showPharma: true, showHerbals: false, showConsumer: false, showOTC: false };

        case 'Herbals':
          return { showAll: false, showPharma: false, showHerbals: true, showConsumer: false, showOTC: false };

				case 'Consumer':
					return { showAll: false, showPharma: false, showHerbals: false, showConsumer: true, showOTC: false };

				case 'OTC':
					return { showAll: false, showPharma: false, showHerbals: false, showConsumer: false, showOTC: true };

        default:
          return state;

      }

		default:
			return state;

	}

}
