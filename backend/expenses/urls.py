from django.urls import path
from .views import (
    ExpenseListView,
    ExpenseCreateView,
    ExpenseDeleteView
)

urlpatterns = [

    path('', ExpenseListView.as_view()),

    path('create/', ExpenseCreateView.as_view()),

    path('delete/<int:pk>/', ExpenseDeleteView.as_view()),

]