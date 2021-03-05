const Show = (props) => {
    const article = props.article;
    return (
        <>
            <h2>{article.title}</h2>
            <h4>Author: {article.author.username}</h4>
            <p>Category: {article.category.title}</p>
            {article.tags.length > 0 &&
                <>
                    <p>Tags:</p>
                    <ul>
                        {article.tags.map(tag => (
                            <li key={tag._id}>{tag.title}</li>
                        ))}
                    </ul>
                </>
            }
            <p><img src={article.image.path} alt="Nature" /></p>
            <p>{article.body}</p>
        </>
    );
};

export default Show;