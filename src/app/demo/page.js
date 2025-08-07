'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Receipt, 
  Users, 
  Upload, 
  CheckCircle, 
  Shield, 
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Plus,
  FileText,
  XCircle,
  User,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';


export default function DemoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const mockUser = {
    name: 'John Doe',
    email: 'john@faysys.com',
    role: 'user',
    department: 'Engineering'
  };

  const mockExpenses = [
    {
      _id: '1',
      title: 'Business Lunch with Client',
      description: 'Lunch meeting with potential client to discuss project requirements',
      amount: 85.50,
      category: 'Meals',
      date: '2024-01-15',
      status: 'pending',
      userId: mockUser,
      attachments: ['receipt_lunch.pdf']
    },
    {
      _id: '2',
      title: 'Office Supplies',
      description: 'Printer paper, pens, and notebooks for the team',
      amount: 125.75,
      category: 'Office Supplies',
      date: '2024-01-14',
      status: 'approved',
      userId: mockUser,
      attachments: ['supplies_receipt.jpg']
    },
    {
      _id: '3',
      title: 'Software License',
      description: 'Annual subscription for design software',
      amount: 299.99,
      category: 'Software',
      date: '2024-01-10',
      status: 'rejected',
      userId: mockUser,
      rejectionReason: 'Software not approved for this department'
    },
    {
      _id: '4',
      title: 'Travel Expenses',
      description: 'Flight and hotel for client meeting in New York',
      amount: 450.00,
      category: 'Travel',
      date: '2024-01-08',
      status: 'approved',
      userId: mockUser,
      attachments: ['flight_receipt.pdf', 'hotel_receipt.pdf']
    },
    {
      _id: '5',
      title: 'Team Building Event',
      description: 'Dinner and activities for team building',
      amount: 200.00,
      category: 'Meals',
      date: '2024-01-05',
      status: 'pending',
      userId: mockUser
    }
  ];

  const mockUsers = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@faysys.com',
      role: 'user',
      department: 'Engineering',
      employeeId: 'ENG001',
      createdAt: '2024-01-01'
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@faysys.com',
      role: 'admin',
      department: 'HR',
      employeeId: 'HR001',
      createdAt: '2024-01-02'
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike@faysys.com',
      role: 'user',
      department: 'Marketing',
      employeeId: 'MKT001',
      createdAt: '2024-01-03'
    },
    {
      _id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@faysys.com',
      role: 'user',
      department: 'Finance',
      employeeId: 'FIN001',
      createdAt: '2024-01-04'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-[#30adb2] bg-[#30adb2]/10';
      case 'approved': return 'text-[#99e799] bg-[#99e799]/10';
      case 'rejected': return 'text-[#1a6ab3] bg-[#1a6ab3]/10';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '#', current: currentView === 'dashboard' },
    { id: 'my-expenses', name: 'My Expenses', icon: Receipt, href: '#', current: currentView === 'my-expenses' },
    { id: 'add-expense', name: 'Add Expense', icon: Plus, href: '#', current: currentView === 'add-expense' },
    { id: 'all-expenses', name: 'Review Expenses', icon: FileText, href: '#', current: currentView === 'all-expenses' },
    { id: 'user-management', name: 'User Management', icon: Users, href: '#', current: currentView === 'user-management' },
  ];

  useEffect(() => {
    if (!loading && user) {
      // Redirect authenticated users to main app
      if (user.role === 'admin') {
        router.push('/admin/expenses');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1a6ab3] border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const handleViewExpense = (expense) => {
    setSelectedExpense(expense);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (expenseId) => {
    setExpenseToDelete(expenseId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setLoadingAction(true);
    // Simulate API call
    setTimeout(() => {
      alert('Expense deleted successfully! (Demo mode)');
      setLoadingAction(false);
      setShowDeleteConfirm(false);
      setExpenseToDelete(null);
    }, 1000);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setExpenseToDelete(null);
  };

  const handleApproveExpense = (expenseId) => {
    alert(`Expense ${expenseId} approved! (Demo mode)`);
  };

  const handleRejectExpense = (expenseId) => {
    alert(`Expense ${expenseId} rejected! (Demo mode)`);
  };

  const filteredExpenses = mockExpenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const renderDashboard = () => (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="heading-1 mb-2">Dashboard</h1>
              <p className="body-text">
                Welcome back, {mockUser.name}
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex items-center space-x-4">
              <p className="text-xs text-gray-500">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a6ab3]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-light text-gray-900">{mockExpenses.length}</p>
              </div>
              <div className="bg-[#1a6ab3] rounded-xl p-3">
                <Receipt className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-light text-gray-900">{mockExpenses.filter(e => e.status === 'pending').length}</p>
              </div>
              <div className="bg-[#30adb2] rounded-xl p-3">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-light text-gray-900">{mockExpenses.filter(e => e.status === 'approved').length}</p>
              </div>
              <div className="bg-[#99e799] rounded-xl p-3">
                <CheckCircle className="h-5 w-5 text-gray-800" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-light text-gray-900">{mockExpenses.filter(e => e.status === 'rejected').length}</p>
              </div>
              <div className="bg-red-500 rounded-xl p-3">
                <XCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="heading-2">Quick Actions</h2>
            <div className="h-px flex-1 bg-gray-200 mx-6"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => setCurrentView('add-expense')}
              className="group card-accent p-6 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#1a6ab3] rounded-xl p-3">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#1a6ab3] transition-colors" />
              </div>
              <h3 className="heading-3 mb-2">Add Expense</h3>
              <p className="body-text">Create new expense entry</p>
            </button>

            <button
              onClick={() => setCurrentView('my-expenses')}
              className="group card-accent p-6 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#30adb2] rounded-xl p-3">
                  <Receipt className="h-5 w-5 text-white" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#30adb2] transition-colors" />
              </div>
              <h3 className="heading-3 mb-2">View Expenses</h3>
              <p className="body-text">See all your expenses</p>
            </button>

            <button
              onClick={() => setCurrentView('all-expenses')}
              className="group card-accent p-6 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#99e799] rounded-xl p-3">
                  <FileText className="h-5 w-5 text-gray-800" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#99e799] transition-colors" />
              </div>
              <h3 className="heading-3 mb-2">Review Expenses</h3>
              <p className="body-text">Approve or reject requests</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="heading-1 mb-2">My Expenses</h1>
              <p className="body-text">
                View and manage all your expense submissions
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <button onClick={() => setCurrentView('add-expense')} className="btn-primary inline-flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Expense</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select 
                className="input-field"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expenses List */}
        {filteredExpenses.length === 0 ? (
          <div className="card p-8 text-center">
            <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="heading-3 mb-2">No expenses found</h3>
            <p className="body-text mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first expense.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button 
                onClick={() => setCurrentView('add-expense')}
                className="btn-primary"
              >
                Add Your First Expense
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense._id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="heading-3">{expense.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                        {getStatusIcon(expense.status)}
                        <span className="ml-1 capitalize">{expense.status}</span>
                      </span>
                    </div>
                    <p className="body-text mb-3">{expense.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${expense.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {expense.category}
                      </span>
                      {expense.attachments && expense.attachments.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Upload className="h-4 w-4" />
                          <span>{expense.attachments.length} file{expense.attachments.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => handleViewExpense(expense)}
                      className="btn-icon"
                      title="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {expense.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => alert('Edit functionality (Demo mode)')}
                          className="btn-icon"
                          title="Edit expense"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(expense._id)}
                          className="btn-icon hover:text-red-500"
                          title="Delete expense"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAddExpense = () => (
    <div className="py-8">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8">
          <h1 className="heading-1 mb-2">Add New Expense</h1>
          <p className="body-text">
            Submit a new expense for approval
          </p>
        </div>

        <div className="card p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter expense title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    className="input-field pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="input-field">
                  <option value="">Select a category</option>
                  <option value="Travel">Travel</option>
                  <option value="Meals">Meals</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Software">Software</option>
                  <option value="Training">Training</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    className="input-field pl-10"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                className="input-field"
                placeholder="Provide a detailed description of the expense..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1a6ab3] transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-gray-500">
                  PDF, JPG, PNG up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={() => alert('File upload functionality (Demo mode)')}
                />
                <button
                  type="button"
                  onClick={() => alert('File upload functionality (Demo mode)')}
                  className="btn-secondary mt-3"
                >
                  Choose Files
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setCurrentView('my-expenses')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  alert('Expense submitted successfully! (Demo mode)');
                  setCurrentView('my-expenses');
                }}
              >
                Submit Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="heading-1 mb-2">User Management</h1>
              <p className="body-text">
                Manage system users and permissions
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <button 
                onClick={() => alert('Add user functionality (Demo mode)')}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select 
                className="input-field"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users List */}
        {filteredUsers.length === 0 ? (
          <div className="card p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="heading-3 mb-2">No users found</h3>
            <p className="body-text">
              {searchTerm || roleFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first user.'
              }
            </p>
          </div>
        ) : (
          <div className="card">
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div key={user._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-[#1a6ab3] flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="heading-3">{user.name}</h3>
                        <p className="body-text flex items-center mt-1">
                          <User className="h-4 w-4 mr-1" />
                          {user.email}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            ID: {user.employeeId}
                          </span>
                          <span className="text-xs text-gray-500">
                            {user.department}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            <Shield className="h-3 w-3 mr-1" />
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => alert('Edit user functionality (Demo mode)')}
                        className="btn-icon"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => alert('Delete user functionality (Demo mode)')}
                        className="btn-icon hover:text-red-500"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAdminExpenses = () => (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="heading-1 mb-2">Expense Review (Admin)</h1>
          <p className="body-text">
            Review and approve or reject expense submissions from all users
          </p>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses, descriptions, or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <select 
                className="input-field"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <select className="input-field">
                <option value="all">All Users</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expenses List */}
        {filteredExpenses.length === 0 ? (
          <div className="card p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="heading-3 mb-2">No expenses found</h3>
            <p className="body-text">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No expense submissions to review at this time.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense._id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="heading-3">{expense.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                        {getStatusIcon(expense.status)}
                        <span className="ml-1 capitalize">{expense.status}</span>
                      </span>
                    </div>
                    <p className="body-text mb-3">{expense.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${expense.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {expense.category}
                      </span>
                      {expense.attachments && expense.attachments.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Upload className="h-4 w-4" />
                          <span>{expense.attachments.length} file{expense.attachments.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>Submitted by: {expense.userId.name}</span>
                      <span>•</span>
                      <span>{expense.userId.department}</span>
                    </div>
                    {expense.rejectionReason && expense.status === 'rejected' && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <strong>Rejection Reason:</strong> {expense.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => handleViewExpense(expense)}
                      className="btn-icon"
                      title="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {expense.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveExpense(expense._id)}
                          className="btn-icon hover:text-green-600"
                          title="Approve"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleRejectExpense(expense._id)}
                          className="btn-icon hover:text-red-600"
                          title="Reject"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const customFooter = (
    <Link
      href="/"
      className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Back to Home
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-25">
      <Sidebar
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showLogout={false}
        customFooter={customFooter}
        onNavClick={setCurrentView}
      />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="flex items-center space-x-3">
                <div className="bg-[#1a6ab3] rounded-full p-2">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{mockUser.name}</p>
                  <p className="text-gray-500">{mockUser.role === 'admin' ? 'Administrator' : 'User'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'my-expenses' && renderExpenses()}
          {currentView === 'add-expense' && renderAddExpense()}
          {currentView === 'all-expenses' && renderAdminExpenses()}
          {currentView === 'user-management' && renderUserManagement()}
        </main>
      </div>

      {/* Expense Detail Modal */}
      {showDetailModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="heading-2">Expense Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-icon"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="heading-3 mb-2">{selectedExpense.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedExpense.status)}`}>
                  {getStatusIcon(selectedExpense.status)}
                  <span className="ml-1 capitalize">{selectedExpense.status}</span>
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-lg font-semibold text-gray-900">${selectedExpense.amount.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{new Date(selectedExpense.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <p className="text-gray-900">{selectedExpense.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted by</label>
                  <p className="text-gray-900">{selectedExpense.userId.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{selectedExpense.description}</p>
              </div>

              {selectedExpense.attachments && selectedExpense.attachments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="space-y-2">
                    {selectedExpense.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Upload className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{attachment}</span>
                        <button 
                          onClick={() => alert('Download functionality (Demo mode)')}
                          className="text-[#1a6ab3] hover:text-[#155a8a] text-sm"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedExpense.rejectionReason && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{selectedExpense.rejectionReason}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                {selectedExpense.status === 'pending' && currentView === 'all-expenses' && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveExpense(selectedExpense._id);
                        setShowDetailModal(false);
                      }}
                      className="btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectExpense(selectedExpense._id);
                        setShowDetailModal(false);
                      }}
                      className="btn-danger"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="heading-2 flex items-center">
                <Trash2 className="h-5 w-5 mr-2 text-red-500" />
                Delete Expense
              </h2>
              <button
                onClick={handleDeleteCancel}
                disabled={loadingAction}
                className="btn-icon"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="heading-3 mb-2">Confirm Deletion</h3>
                  <p className="body-text mb-4">
                    Are you sure you want to delete this expense? This action cannot be undone.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-red-700">
                      <strong>Warning:</strong> This will permanently delete the expense and all associated data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleDeleteCancel}
                  disabled={loadingAction}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={loadingAction}
                  className="btn-danger flex items-center space-x-2"
                >
                  {loadingAction ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
