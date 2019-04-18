window.restiro_docs = {"title": "Notttes", "locale": "fa_IR", "version": null, "base_uri": null, "documents": [], "resources": [{"path": "/note", "method": "get", "tags": ["Note"], "display_name": "Get notes", "description": null, "header_params": [], "uri_params": [], "query_params": [{"name": "sort", "display_name": null, "description": "\n", "type": null, "enum": null, "pattern": null, "min_length": null, "max_length": null, "minimum": null, "maximum": null, "example": null, "repeat": false, "required": false, "default": null}], "form_params": [], "examples": [{"request": {"path": "/note", "method": "get", "headers": {"host": "localhost:80"}, "query_strings": null, "form_params": null, "body_format": null, "body_text": ""}, "response": {"status": 200, "reason": "OK", "headers": {"content-type": "application/json; charset=utf-8", "content-length": "22"}, "body_format": "json", "body": "[\n    \"Welcome Note\"\n]"}}]}, {"path": "/note/:noteId", "method": "get", "tags": ["Note"], "display_name": "Get one note", "description": "# Ferri lustravit hasta memorabile morientis suos \n## Facem mei aris \nLorem markdownum **nec** poenas, in tuus at arida. I dixere bulla *solo est*, enim passim parvus, et **amat milite manu** sui referens, et regna. Oris quoniam! Quoque hoc nec missa **servare premuntur** Agamemnona vis obruor doliturus. \n1. Pollice lumina discedunt semine 2. Aeneadae neu adopertam 3. Certe memorique decolor distinctus corpora \n## Meliore in mea mihi \nAntiqua adesse petisti. A servat imagine quae! \nSanguinis me quid: tinxit conviciaque [vult cumque bene](http://etadducor.org/) tamen? Talia hoc centum inveniunt antiquus acuta inpulsu: suis imoque posses, vult non *lanianda* ferentes. In tibi quae vel **calido volat secretaque** vertit sit dixit, libera ipse valvis duos. \n## Et auctorem habitandae mutua vix \nUt et Riphea vastum et aliter tantum quod Telamon cornu ab addita, nunc. Illa non. Quaerit rigescere arcere multis sine. Fuga huic Osiris. Illi arma habebit: quoque abit dederat salutem genu, Alcyone. \n## Ac ope ratus cum patebat spemque \nPars per excusare portare actum conantemque carne, arma cum cum vultus quondam Salmacis altera reponere cacumen sacra. Roboris adit illa et luserit dederint rem. Poteras contigerant meosque nubila saucius in reverentia alte dubites, sed aut conantesque simul: dare **indignantia duris non** fletque. Pulsa verborum invenies venias terrigenasque cuspide lactantiaque magis tenebat **Troades frustra**, at corpora fortis. Suspiria repetebam peto reducunt circa cum in **voce** nullo exterrita facta. \n## Enim utque prodere \n[Suis redeuntis](http://quamratem.net/tua) seque **et** qui saepe pietate illa tuo incaluitque cumque parte miratur rigidi et. **Bono et** semel trementi [quid](http://deus.org/ibiamuli.aspx). Gratissime viderunt geminatis dicentum arbor, faucibus quamvis denique teli at, mihi. Ornum tolle dilata Telamon, in est Phrygiae aevi aras terras porrigit. Matrum Ino laedunt inspiciunt et sanguis Thebis potest; laboras constitit amari in quies Naupliades. \nPlacent serpentem pectus occupat superinposita [Midae repetitque](http://nisirupibus.org/) et murmure traxit. Iungere protinus confinia famulae, de saxum trepidat citius, relevare poenaeque hunc dederant, est. Et perque oblitus vestibus hederis. **Et Pallas ut** distuleratque tuum lacrimisque **nostris**? \nEt nec quaecumque in arguit, Aonides terga, calamis praecordia *veluti* reponit **ratae** tamen mora unda [vocis reverti Aethionque](http://hoc.net/). Damnare posse naturaeque movet Minervam temperat vim.", "header_params": [], "uri_params": [{"name": "noteId", "display_name": null, "description": "\n\n", "type": null, "enum": null, "pattern": null, "min_length": null, "max_length": null, "minimum": null, "maximum": null, "example": null, "repeat": false, "required": true, "default": null}], "query_params": [], "form_params": [], "examples": [{"request": {"path": "/note/0", "method": "get", "headers": {"host": "localhost:80"}, "query_strings": null, "form_params": null, "body_format": null, "body_text": ""}, "response": {"status": 200, "reason": "OK", "headers": {"content-type": "application/json; charset=utf-8", "content-length": "14"}, "body_format": "json", "body": "\"Welcome Note\""}}]}, {"path": "/note", "method": "post", "tags": ["Note"], "display_name": "Create new note", "description": null, "header_params": [], "uri_params": [], "query_params": [], "form_params": [{"name": "title", "display_name": null, "description": "", "type": "String", "enum": null, "pattern": null, "min_length": null, "max_length": null, "minimum": null, "maximum": null, "example": null, "repeat": false, "required": false, "default": null}, {"name": "content", "display_name": null, "description": "\n", "type": "String", "enum": null, "pattern": null, "min_length": null, "max_length": null, "minimum": null, "maximum": null, "example": null, "repeat": false, "required": true, "default": null}], "examples": [{"request": {"path": "/note", "method": "post", "headers": {"host": "localhost:80", "content-type": "application/json", "content-length": "27"}, "query_strings": null, "form_params": null, "body_format": "json", "body_text": "{\"content\": \"Hello world!\"}"}, "response": {"status": 200, "reason": "OK", "headers": {"content-type": "application/json; charset=utf-8", "content-length": "19"}, "body_format": "json", "body": "\"None Hello world!\""}}]}, {"path": "/note/:id", "method": "delete", "tags": ["Note"], "display_name": "Delete a note", "description": null, "header_params": [], "uri_params": [], "query_params": [], "form_params": [], "examples": [{"request": {"path": "/note/999999", "method": "delete", "headers": {"host": "localhost:80", "content-length": "0"}, "query_strings": null, "form_params": null, "body_format": null, "body_text": ""}, "response": {"status": 400, "reason": "Invalid ID", "headers": {"contenttype": "application/json"}, "body_format": null, "body": "{\"stackTrace\":\"Traceback (most recent call last):\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro\\/venv\\/lib\\/python3.6\\/site-packages\\/nanohttp\\/application.py\\\", line 108, in __call__\\n    response_body = self.__root__(*remaining_paths)\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro\\/venv\\/lib\\/python3.6\\/site-packages\\/nanohttp\\/controllers.py\\\", line 109, in __call__\\n    return self._serve_handler(handler, remaining_paths)\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro\\/venv\\/lib\\/python3.6\\/site-packages\\/nanohttp\\/controllers.py\\\", line 103, in _serve_handler\\n    return handler(*remaining_paths, **kwargs)\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro\\/venv\\/lib\\/python3.6\\/site-packages\\/nanohttp\\/controllers.py\\\", line 109, in __call__\\n    return self._serve_handler(handler, remaining_paths)\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro\\/venv\\/lib\\/python3.6\\/site-packages\\/nanohttp\\/controllers.py\\\", line 103, in _serve_handler\\n    return handler(*remaining_paths, **kwargs)\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro\\/venv\\/lib\\/python3.6\\/site-packages\\/nanohttp\\/decorators.py\\\", line 133, in wrapper\\n    result = func(*args, **kwargs)\\n  File \\\"\\/home\\/dobby\\/works-dev\\/restiro-demo-nanohttp\\/nanohttp_notes\\/controllers.py\\\", line 123, in delete\\n    raise HTTPBadRequest('Invalid ID')\\nnanohttp.exceptions.HTTPBadRequest: 400 Invalid ID\\n\"}"}}, {"request": {"path": "/note/1", "method": "delete", "headers": {"host": "localhost:80", "content-length": "0"}, "query_strings": null, "form_params": null, "body_format": null, "body_text": ""}, "response": {"status": 204, "reason": "No Content", "headers": {"contenttype": "application/json"}, "body_format": null, "body": ""}}]}]}