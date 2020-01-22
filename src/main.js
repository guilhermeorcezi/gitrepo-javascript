import api from './api';

class App{
    constructor(){
        this.repositories = [];
        this.inputElement = document.querySelector('input[name=repo]');
        this.listElement = document.querySelector('#repo-list');
        this.formElement = document.getElementById('repo-form');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadElement = document.createElement('span');
            loadElement.appendChild(document.createTextNode('Carregando...'));
            loadElement.setAttribute('id','loading');

            this.formElement.appendChild(loadElement);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(e){
        e.preventDefault();

        const repoInput = this.inputElement.value;

        if(repoInput.length === 0) return;

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`)

            const {name, description, html_url, owner: {avatar_url} } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.inputElement.value = '';
            this.render();

        }catch(err){
            alert('Repositório inexistente');
        }

        this.setLoading(false);
    }   

    render(){
        this.listElement.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src',repo.avatar_url);

            let nameElement = document.createElement('strong');
            nameElement.appendChild(document.createTextNode(repo.name));

            let pElement = document.createElement('p');
            pElement.appendChild(document.createTextNode(repo.description));

            let linkElement = document.createElement('a');
            linkElement.setAttribute('target','_blanket');
            linkElement.setAttribute('href',`${repo.html_url}`);
            linkElement.appendChild(document.createTextNode('Link do Projeto'));

            let liElement = document.createElement('li');
            liElement.appendChild(imgElement);
            liElement.appendChild(nameElement);
            liElement.appendChild(pElement);
            liElement.appendChild(linkElement);

            this.listElement.appendChild(liElement);
        });
    }
}

new App();                  