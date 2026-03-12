# Aquaura

Questo progetto è un'applicazione Ruby on Rails (v8.1.2) con DaisyUI per lo styling. Segui questi passaggi per configurare l'ambiente di sviluppo su un altro computer.

## Requisiti

Assicurati di avere installato:
* **Ruby 3.4.7** (si consiglia l'uso di `rbenv` o `asdf`)
* **Node.js** e **NPM** (necessari per DaisyUI e Tailwind CSS)
* **SQLite3**

## Configurazione

1. **Clona il repository:**
   ```bash
   git clone <url-del-repo>
   cd aquaura
   ```

2. **Installa le dipendenze Ruby:**
   ```bash
   bundle install
   ```

3. **Installa le dipendenze JavaScript:**
   ```bash
   npm install
   ```

4. **Prepara il database:**
   ```bash
   bin/rails db:prepare
   ```

5. **Avvia il server di sviluppo:**
   ```bash
   bin/dev
   ```
   *Nota: `bin/dev` avvia sia il server Rails che il processo di compilazione CSS/JS in parallelo.*

## Struttura del progetto

* `app/views`: Contiene le pagine del sito (Home, Blog, Shop, Servizi).
* `app/javascript/controllers`: Controller Stimulus per le interazioni dinamiche.
* `tailwind.config.js`: Configurazione di Tailwind e DaisyUI.
