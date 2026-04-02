# INFRASTRUCTURE ET DEVOPS
Mathys Farineau  -  M2 IW
 
## PROJET - Docker Swarm

docker swarm join --token SWMTKN-1-5svp4j813xmq52s9dd0qa686laz8558l0s4mrc96xxtevtpsgo-5j4l9otdgqbzhcm4f4fp5v2ix 172.25.0.3:2377

### Exercice 2 - Création du cluster Docker Swarm

Création du compose initial

![Image1.png](img/Image1.png)

Initialisation de docker swarm dans le container manager

![Image2.png](img/Image2.png)

Ajout des 3 nœuds workers dans le cluster

![Image3.png](img/Image3.png)
![Image4.png](img/Image4.png)
![Image5.png](img/Image5.png)

Vérification dans le Manager que tout est OK

![Image6.png](img/Image6.png)

---

### Exercice 3 - Tests du cluster

Pour plus de simplicité, je crée le compose avec mon éditeur, puis je le copie dans le container manager

![Image7.png](img/Image7.png)
![Image8.png](img/Image8.png)
![Image9.png](img/Image9.png)

Apparemment on ne peut pas mettre de name, je recommence la manip sans le name dans le compose.

![Image10.png](img/Image10.png)

Problème : les réplicas ne marchent pas.

Pourquoi ? J'imagine que c'est car l'image hello world affiche juste hello world et s'arrête. Donc une fois arrêté, les
réplicas s'arrêtent également.

Vu en cours, on va utiliser l'image nmatsui/hello-world-api qui affiche hello world et reste en écoute.

![Image11.png](img/Image11.png)

Pour faire varier, je peux rajouter 
```
placement:
        constraints:
          - node.role == manager
```


ou bien 

```
deploy:
      mode: global
```

La première variante ne déploie que sur le manager, tandis que la seconde déploie sur tous les workers.

---

### Exercice 4 - Premiers tests Ansible

1.
Pour lancer la stack avec 3 noeud, je peux utiliser la commande :

```
docker compose up -d --scale node=3
```

Si je fais docker ps, j'ai bien :

![Image12](img/Image12.png)


2.
Le playbook automatise les commandes swarm que l'on a fait juste avant. Il fait un swarm init, puis il fait join les worker dedans

Sous Windows, j'install ansible puis le plugin docker :
```
pip install ansible

ansible-galaxy collection install community.docker
```

Ca ne marche pas sous windows. Du coup, je l'installe dans ma distribution Ubuntu WSL2.

J'ai des problèmes à l'exécution de l'inventaire donc j'ajoute un fichier de config.

```
[defaults]
remote_tmp = /tmp/.ansible/tmp
```

Ca ne marche toujours pas donc je copie le projet dans wsl complètement.

Après beaucoup de manipulations j'ai enfin réussi à exécuter l'inventaire :

![Image13](img/Image13.png)


Ca a l'air de bien marcher :

![Image14](img/Image14.png)

Si je relance, j'observe que ce n'est plus en changed mais en ok, car rien n'a changé.


---

### Exercice 5 - Comprendre Ansible

1.
J'ajoute un noeud supplémentaire :

```
docker compose up -d --scale node=4
```


Puis je le met dans l'inventaire :

esgi-2604-ansible-node-4

Je vois que les 3 anciens sont intacts et que le nouveau a bien été ajouté.



2.
Pour adapter pour des VMs/VPS en SSH, il faudrait ajouter les IP pour le manager et les workers. Aussi, il faudrait ajouter des clés pour le ssh dans l'inventaire.

Dans le playbook, on devrait modifier les commandes pour ajouter l'adresse. Par exemple, 

command: "docker swarm init"

devient : 

command: "docker swarm init --advertise-addr {{ ansible_host }}"


Ou par exemple :

command: "{{ hostvars[groups['managers'][0]]['worker_join_command'] }} manager:2377"


devient :

command: "{{ hostvars[groups['managers'][0]]['worker_join_command'] }} {{ hostvars[groups['managers'][0]]['ansible_host'] }}:2377"


4

De ce que j'ai compris, Terraform sert à "provisionner" l'infra. Il va créer les ressources cloud (VMs, réseaux, load balancers, DNS...) chez des fournisseurs comme AWS, GCP ou Azure. Il parle à des APIs cloud pour faire apparaître des machines de zéro.

Ansible, lui,  sert à configurer ce qui tourne sur cette infrastructure : une fois les machines créées par Terraform, Ansible s'y connecte en SSH pour installer Docker, configurer des services, déployer des applications, etc.
