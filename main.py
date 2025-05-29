from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# ___Configuración del servidor y base de datos___
usuario_bd = 'root'
password_bd = '10503'
servidor_bd = 'localhost'
puerto_bd = '3306'
nombre_bd = 'portal'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{usuario_bd}:{password_bd}@{servidor_bd}:{puerto_bd}/{nombre_bd}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ___Inicialización de extensiones___
db = SQLAlchemy(app)
ma = Marshmallow(app)

# ___Modelo de datos___
class Categoria(db.Model):
    __tablename__ = "categoria"

    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255))
    imagen_url = db.Column(db.String(255), nullable=False)

    def __init__(self, nombre, imagen_url, descripcion=None):
        self.nombre = nombre
        self.imagen_url = imagen_url
        self.descripcion = descripcion

# ___Esquema de serialización___
class CategoriaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Categoria
        load_instance = True

categoria_schema = CategoriaSchema()
categorias_schema = CategoriaSchema(many=True)

# ___Rutas principales___
@app.route('/')
def index():
    categorias = Categoria.query.all()
    return render_template('index.html', categorias=categorias)

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/seguroespec/<int:id>')
def seguroespec(id):
    categoria = Categoria.query.get_or_404(id)
    return render_template('seguroespec.html', categoria=categoria)


# ___Rutas CRUD API___
@app.route('/categoria', methods=['GET'])
def get_categorias():
    all_categorias = Categoria.query.all()
    result = categorias_schema.dump(all_categorias)
    return jsonify(result)

@app.route('/categoria/<int:id>', methods=['GET'])
def get_categoriaID(id):
    una_categoria = Categoria.query.get_or_404(id)
    return categoria_schema.jsonify(una_categoria)

@app.route('/categoria', methods=['POST'])
def insert_categoria():
    data = request.get_json(force=True)
    nombre = data.get('nombre')
    imagen_url = data.get('imagen_url')
    descripcion = data.get('descripcion', None)

    if not nombre or not imagen_url:
        return jsonify({'error': 'Nombre e imagen_url son requeridos'}), 400

    nueva_categoria = Categoria(nombre, imagen_url, descripcion)

    db.session.add(nueva_categoria)
    db.session.commit()
    return categoria_schema.jsonify(nueva_categoria), 201

@app.route('/categoria/<int:id>', methods=['PUT'])
def update_categoria(id):
    data = request.get_json(force=True)
    actualizar_categoria = Categoria.query.get_or_404(id)

    nombre = data.get('nombre')
    imagen_url = data.get('imagen_url')
    descripcion = data.get('descripcion', None)

    if nombre:
        actualizar_categoria.nombre = nombre
    if imagen_url:
        actualizar_categoria.imagen_url = imagen_url
    if descripcion is not None:
        actualizar_categoria.descripcion = descripcion

    db.session.commit()
    return categoria_schema.jsonify(actualizar_categoria)

@app.route('/categoria/<int:id>', methods=['DELETE'])
def delete_categoria(id):
    eliminar_categoria = Categoria.query.get_or_404(id)
    db.session.delete(eliminar_categoria)
    db.session.commit()
    return categoria_schema.jsonify(eliminar_categoria)

# Nota: La ruta /index estaba duplicada, se eliminó para evitar conflicto.

# ___Ejecutar servidor___
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)
