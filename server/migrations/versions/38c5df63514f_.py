"""empty message

Revision ID: 38c5df63514f
Revises: c82dbff3dc0e
Create Date: 2023-10-08 03:30:33.281744

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38c5df63514f'
down_revision = 'c82dbff3dc0e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('discussion', schema=None) as batch_op:
        batch_op.alter_column('observation_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('discussion', schema=None) as batch_op:
        batch_op.alter_column('observation_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
