from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Expense
from .serializers import ExpenseSerializer


# -------------------------
# List Expenses
# -------------------------

class ExpenseListView(generics.ListAPIView):

    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)


# -------------------------
# Create Expense
# -------------------------

class ExpenseCreateView(generics.CreateAPIView):

    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -------------------------
# Delete Expense
# -------------------------

class ExpenseDeleteView(generics.DestroyAPIView):

    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]