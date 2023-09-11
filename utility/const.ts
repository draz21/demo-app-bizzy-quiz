interface optionProps {
    value: string,
    label: string,
}

export const categoryOptions: optionProps[] = [
    {
        value: '9',
        label: 'General Knowledge'
    },
    {
        value: '21',
        label: 'Sports'
    },
    {
        value: '31',
        label: 'Entertainment: Japanese Anime & Manga'
    },
]

export const difficulityOptions: optionProps[] = [
    {
        value: 'easy',
        label: 'Easy'
    },
    {
        value: 'medium',
        label: 'Medium'
    },
    {
        value: 'hard',
        label: 'Hard'
    }
]