import { useTranslation } from 'react-i18next';

const useStartGameValidation = (players) => {
    const { t } = useTranslation();

    const validate = () => {
        if (!players || players.length < 2) {
            return {
                isValid: false,
                message: t('start_game_validation_message')
            };
        }
        return { isValid: true };
    };

    return validate;
};

export default useStartGameValidation;
