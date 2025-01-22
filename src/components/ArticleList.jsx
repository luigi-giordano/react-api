import { useState, useEffect } from 'react';

const categories = ['Hobby', 'Casa', 'Lavoro', 'Studio'];
const availableTags = [
  { id: 1, name: 'Tempo libero' },
  { id: 2, name: 'Shopping' },
  { id: 3, name: 'Cibo' },
  { id: 4, name: 'Casa' },
  { id: 5, name: 'Sport' },
  { id: 6, name: 'Tecnologia' },
];

const defaultArticleData = {
  title: '',
  content: '',
  category: '',
  tags: [],
  image: '',
  published: false,
};

const ArticleList = () => {
  const [articleList, setArticleList] = useState([
    {
      title: 'Acquisti in fumetteria',
      content: 'Comprare manga e fumetti preferiti.',
      category: 'Hobby',
      tags: ['Tempo libero', 'Shopping'],
      image: '',
      published: true,
    },
    {
      title: 'Fare la spesa',
      content: 'Lista di alimenti e prodotti da comprare.',
      category: 'Casa',
      tags: ['Cibo', 'Casa'],
      image: '',
      published: false,
    },
  ]);

  const [formData, setFormData] = useState(defaultArticleData);

  useEffect(() => {
    if (formData.published) {
      alert('Hai selezionato "Pubblica articolo", pertanto sarà visibile al pubblico.');
    }
  }, [formData.published]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevArticle) => ({
      ...prevArticle,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagChange = (tagName) => {
    setFormData((prevArticle) => {
      const updatedTags = prev.tags.includes(tagName)
        ? prevArticle.tags.filter((tag) => tag !== tagName)
        : [...prevArticle.tags, tagName];
      return { ...prevArticle, tags: updatedTags };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setArticleList((prevList) => [...prevList, formData]);
    setFormData(defaultArticleData);
  };

  const handleRemoveArticle = (index) => {
    setArticleList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="title d-flex mb-3 justify-content-center">
          <h2>Il tuo Blog</h2>
        </div>

        <div className="mb-3">
          <label className="form-label">Titolo</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Inserisci il titolo"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contenuto</label>
          <textarea
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Inserisci il contenuto"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div>
            {availableTags.map(({ id, name }) => (
              <div key={id} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  id={id}
                  className="form-check-input"
                  checked={formData.tags.includes(name)}
                  onChange={() => handleTagChange(name)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Immagine (URL)</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Inserisci URL dell'immagine"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="published"
            className="form-check-input"
            id="published"
            checked={formData.published}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="published">
            Pubblica articolo
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Aggiungi
        </button>
      </form>

      <ul className="list-group mt-4">
        {articleList.map((article, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{article.title}</span>
            <i
              className="fa-solid fa-trash pointer"
              onClick={() => handleRemoveArticle(index)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
