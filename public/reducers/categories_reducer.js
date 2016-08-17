import { CHANGE_CATEGORY_FILTER } from 'Actions';

const INITIAL_STATE = { showAll: true, showPharma: false, showHerbals: false, showMiscellaneous: false };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case CHANGE_CATEGORY_FILTER:

			switch (action.payload) {

        case 'All':
          return { showAll: true, showPharma: false, showHerbals: false, showMiscellaneous: false };

        case 'Pharmaceuticals':
          return { showAll: false, showPharma: true, showHerbals: false, showMiscellaneous: false };

        case 'Herbals':
          return { showAll: false, showPharma: false, showHerbals: true, showMiscellaneous: false };

				case 'Miscellaneous':
					return { showAll: false, showPharma: false, showHerbals: false, showMiscellaneous: true }

        default:
          return state;

      }

		default:
			return state;

	}

}
