interface ITranslatedHtml {
    html: string;
}

/**
 * Locale policy copy is authored in the repository and does not include user
 * input. Keep the HTML boundary in one component so pages do not accidentally
 * place block-level translated markup inside a paragraph.
 */
function TranslatedHtml(props: ITranslatedHtml) {
    return <div className="translatedHtml" dangerouslySetInnerHTML={{ __html: props.html }} />;
}

export default TranslatedHtml;
