
class App{
    constructor(){
        this.repositories = [];
        this.inputElement = document.querySelector('input');
        this.buttonElement = document.querySelector('button');
        this.listElement = document.querySelector('#repo-list');
        this.formElement = document.getElementById('repo-form');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    addRepository(e){
        e.preventDefault();
        
        this.repositories.push({
            name: 'Rocketseat',
            description: 'Mete o loco e finge algo importante aqui',
            avatar_url: 'https://avatars1.githubusercontent.com/u/29787610?s=460&v=4',
            html_url: 'https://github.com'
        });

        this.render();
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
            linkElement.setAttribute('href',`https://${repo.html_url}`);
            linkElement.appendChild(document.createTextNode('Linsque'));

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